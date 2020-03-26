# Reference: 
# https://medium.com/bitcraft/docker-composing-a-python-3-flask-app-line-by-line-93b721105777

FROM python:3

# Set env variable with the directory
# containing the app
ENV APP_DIR /app

# Create a directory for our API
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# Port on which the app is going to listen
EXPOSE 5000

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the codebase
COPY . .