# Library
import os
from dotenv import load_dotenv

# Ably Library
import asyncio
import ably
from ably import AblyRealtime
from ably import AblyRest

load_dotenv('./env')

Access = os.getenv('accessKey')

async def main():
    # Connect to Ably
    ably = AblyRealtime(Access)
    await ably.connection.once_async('connected')
    print('Connected to Ably')

    # Subscribe to channel
    channel = ably.channels.get('quickstart')
    async def listener(message):
        print('Received a greeting message in realtime: ' + message.data)
    await channel.subscribe(listener)

    # Publish a Message
    channel = ably.channels.get('quickstart')
    await channel.publish('greeting', 'hello!')

    await ably.close()
    print('Closed the connection to Ably.')

asyncio.run(main())


client = AblyRealtime(Access)

def listener(state_change):
    print(state_change.current)
ably.realtime.connection.on(listener)

# remove a single listener
ably.realtime.connection.off(listener)

# remove all listeners
ably.realtime.connection.off()

