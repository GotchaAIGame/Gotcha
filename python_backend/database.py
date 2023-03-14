"""
temp DB for local test
last update : 2023.03.14 16:11
"""

import databases
import sqlalchemy

DB_URL = "sqlite:///test.db"
database = databases.Database(DB_URL)
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "notes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key= True),
    sqlalchemy.Column("text", sqlalchemy.String, primary_key= True),
    sqlalchemy.Column("completed", sqlalchemy.Boolean, primary_key= True),
)

engine = sqlalchemy.create_engine(
    DB_URL, connect_args={"check_same_thread" : False}
)
metadata.create_all(engine)