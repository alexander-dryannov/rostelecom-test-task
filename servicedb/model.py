import ormar
from db import MainMeta


class Citizen(ormar.Model):
    class Meta(MainMeta):
        tablename = 'citizen'

    id: int = ormar.Integer(primary_key=True, index=True, autoincrement=True)
    first_name: str = ormar.String(max_length=100)
    last_name: str = ormar.String(max_length=100)
    middle_name: str = ormar.String(max_length=100)
    telephone: int = ormar.Integer(unique=True)
    appeal: str = ormar.Text()
