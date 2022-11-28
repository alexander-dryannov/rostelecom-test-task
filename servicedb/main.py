import json
import asyncio
import uvicorn
from model import Citizen
from aio_pika import connect
from fastapi import FastAPI
from db import database, metadata, engine
from aio_pika.abc import AbstractIncomingMessage

app = FastAPI()

metadata.create_all(engine)
app.state.database = database


async def on_message(message: AbstractIncomingMessage) -> None:
    body = json.loads(message.body)
    await Citizen.objects.create(
        first_name=body['firstName'],
        last_name=body['lastName'],
        middle_name=body['middleName'],
        telephone=body['telephone'],
        appeal=body['appeal'],
    )


@app.on_event("startup")
async def startup() -> None:
    database_ = app.state.database
    # conn_pika = await connect('amqp://guest:guest@localhost/')
    # async with conn_pika:
    #     channel = await conn_pika.channel()
    #     queue = await channel.declare_queue('fastapi')
    #     await queue.consume(on_message, no_ack=True)
    #     await asyncio.Future()

    if not database_.is_connected:
        await database_.connect()


@app.on_event("shutdown")
async def shutdown() -> None:
    database_ = app.state.database
    if database_.is_connected:
        await database_.disconnect()


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True, log_level='info', proxy_headers=True)
