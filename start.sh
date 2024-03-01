#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use and kill the process using that port
check_and_kill_port() {
    local port="$1"
    local pid=$(lsof -ti:$port)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}Port $port is already in use.${NC} Killing the process..."
        kill -9 $pid
        echo -e "${GREEN}Process using port $port has been killed.${NC}"
    fi
}

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python is not installed.${NC} Please install Python before running this script."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed.${NC} Installing npm..."
    brew install npm || { echo -e "${RED}Failed to install npm.${NC}"; exit 1; }
    echo -e "${GREEN}npm has been installed successfully.${NC}"
fi

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the backend directory
cd "$SCRIPT_DIR/backend" || { echo -e "${RED}Error: Backend directory not found.${NC}"; exit 1; }

# Check if Django, django-rest-framework, and corsheaders are installed
if ! python3 -c "import django" 2>/dev/null || ! python3 -c "import rest_framework" 2>/dev/null || ! python3 -c "import corsheaders" 2>/dev/null; then
    echo -e "${YELLOW}Django, django-rest-framework, or corsheaders is not installed.${NC} Installing Django, django-rest-framework, and corsheaders..."
    pip3 install django || { echo -e "${RED}Error: Failed to install Django.${NC}"; exit 1; }
    pip3 install djangorestframework || { echo -e "${RED}Error: Failed to install django-rest-framework.${NC}"; exit 1; }
    pip3 install django-cors-headers || { echo -e "${RED}Error: Failed to install corsheaders.${NC}"; exit 1; }
    echo -e "${GREEN}Django, django-rest-framework, and corsheaders have been installed successfully.${NC}"
fi

# Start the Django server in the background
check_and_kill_port 8000
python3 manage.py runserver &
# Store the process ID of the Django server
DJANGO_SERVER_PID=$!

# Navigate to the frontend directory
cd "$SCRIPT_DIR/frontend" || { echo -e "${RED}Error: Frontend directory not found.${NC}"; exit 1; }

# Check if npm dependencies need to be installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}npm dependencies are not installed.${NC} Installing npm dependencies..."
    npm install || { echo -e "${RED}Error: Failed to install npm dependencies.${NC}"; exit 1; }
    echo -e "${GREEN}npm dependencies have been installed successfully.${NC}"
fi

# Start the npm development server
echo -e "${YELLOW}Starting the frontend server...${NC}"
npm run dev &

# Final message
echo -e "${GREEN}Welcome to habitr development server${NC}"
echo -e "Version 1.3.2 - Pre"
echo -e "A project by Abdulmoeez Kamran for IU International"
echo -e "${YELLOW}<GO TO APP>${NC}"

# Open the browser with the specified URL
sleep 5 # Wait for the servers to start
open "http://localhost:5173"
