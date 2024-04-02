FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY ./dist/apps/crm /usr/share/nginx/html

# This line is IMPORTANT, we will breakdown it on a minute.
COPY ./docker/entrypoint.sh /usr/local/app/entrypoint.sh

# Copy the nginx conf that we created to the container
COPY ./docker/nginx.conf  /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443 6006 4200

RUN chmod +x /usr/local/app/entrypoint.sh
ENTRYPOINT [ "/usr/local/app/entrypoint.sh" ]

