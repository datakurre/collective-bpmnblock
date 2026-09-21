# syntax=docker/dockerfile:1
ARG VARNISH_VERSION=8.0
FROM varnish:${VARNISH_VERSION}

LABEL maintainer="Asko Soukka <asko.soukka@iki.fi>" \
      org.label-schema.name="project-title-varnish" \
      org.label-schema.description="Project Title Varnish image." \
      org.label-schema.vendor="Asko Soukka"

COPY etc/varnish.vcl /etc/varnish/default.vcl
