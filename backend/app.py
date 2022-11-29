import os
import pika
import asyncio
import tornado.web


class Base(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Content-Type", "application/json")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "content-type")
        self.set_header("Access-Control-Allow-Methods", "POST, OPTIONS")

    def options(self):
        self.set_status(204)
        self.finish()


class FormProcessing(Base):
    def post(self):
        credentials = pika.PlainCredentials('rtelecom_user', 'rtelecom_password')
        params = pika.ConnectionParameters(host='rabbitmq', port=5672, credentials=credentials)
        con_pika = pika.BlockingConnection(params)
        channel = con_pika.channel()
        channel.queue_declare(queue='fastapi')
        channel.basic_publish(
            exchange='',
            routing_key='fastapi',
            body=self.request.body)
        con_pika.close()


def make_app():
    return tornado.web.Application([
        (r'/processing', FormProcessing)
    ])


async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == '__main__':
    asyncio.run(main())
