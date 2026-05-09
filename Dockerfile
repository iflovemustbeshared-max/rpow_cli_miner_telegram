FROM node:20-slim

# Install build essentials for native miner
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy all files
COPY . .

# Build native miner
RUN gcc -O3 -march=x86-64 -pthread rpow-native-miner.c -o rpow-native-miner && chmod +x rpow-native-miner

# Set environment variables (can be overridden in Railway)
ENV RPOW_COUNT=999999
ENV RPOW_WORKERS=1
ENV RPOW_ENGINE=native

# Command to run the miner
# We use a shell form to allow environment variable expansion
CMD node rpow-cli.js run --count $RPOW_COUNT --workers $RPOW_WORKERS --engine $RPOW_ENGINE
