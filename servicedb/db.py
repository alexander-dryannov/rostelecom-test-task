import ormar
from databases import Database
import sqlalchemy
import core.settings as settings

metadata = sqlalchemy.MetaData()
database = Database(settings.DATABASE)
engine = sqlalchemy.create_engine(settings.DATABASE)


class MainMeta(ormar.ModelMeta):
    metadata = metadata
    database = database
