import ormar
import databases
import sqlalchemy
import core.settings as settings


metadata = sqlalchemy.MetaData()
database = databases.Database(settings.DATABASE)
engine = sqlalchemy.create_engine(settings.DATABASE)


class MainMeta(ormar.ModelMeta):
    metadata = metadata
    database = database
