# Library
import os
from dotenv import load_dotenv

# Ably Library
import asyncio
from ably import AblyRealtime

load_dotenv('./env')

Access = os.getenv('accessKey')

async def main():
    ably = AblyRealtime(Access)
    await ably.connection.once_async('connected')
    print('Connected to Ably')


asyncio.run(main())
