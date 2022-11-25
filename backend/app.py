import pika
import asyncio
import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('Hello, world')


class FormProcessing(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        con_pika = pika.BlockingConnection(
            pika.ConnectionParameters('localhost'))
        channel = con_pika.channel()
        channel.queue_declare(queue='fastapi')
        channel.basic_publish(
            exchange='',
            routing_key='fastapi',
            body=self.request.body)
        con_pika.close()
        print('[AMQP] Sent message')


def make_app():
    return tornado.web.Application([
        (r'/', MainHandler),
        (r'/processing', FormProcessing)
    ])


async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == '__main__':
    asyncio.run(main())
