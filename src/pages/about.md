---
layout: ../layouts/Page.astro
title: About
description: Information about the NATS dashboard web application.
keywords:
  - NATS Dashboard Information
  - About NATS Dashboard
---

# About

This web application is a dashboard for displaying the metrics and stats of a [**NATS Server**](https://nats.io).

The app was inspired by [nats-top](https://github.com/nats-io/nats-top) which is top-like tool for monitoring NATS servers.

## How It Works

This app simply makes HTTP requests to the [monitoring](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring) endpoint of a NATS server in a predefined interval.

Currently these endpoints are supported:

- `/vars`: General server information
- `/connz`: Connections information
- `/jsz`: JetStream information

Support for other endpoints will be added in later versions.

## Privacy

This app is fully [open source](https://github.com/mdawar/nats-dashboard) and runs completely in the browser so nothing is shared with any third party, all the data is handled in the browser.

You can run you own version of the app locally or on your own server.
