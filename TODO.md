# TODO

- [ ] Fix inconsistent date formatting
- [ ] Display cluster info
- [ ] Sorting options for streams (e.g. by consumer count, data size, msg count...)
- [ ] Add page to create WebSocket clients that publish and subscribe to subjects
- [ ] Accounts page
- [ ] Account stats page
- [ ] Routes page
- [ ] Gateways page
- [ ] Leaf nodes page
- [ ] Subscriptions page

# Non Essential Fixes

- [ ] Menu sidebar close button transition (`solid-transition-group` Does not support child animations)
- [ ] Remove `Modal`/`SlideOver`/`MobileSidebar` components exit animation workaround (Depends on `solid-transition-group`)
- [ ] Fix `clickOutside` directive not recognized by TypeScript that it's being used (Currently preserving the import by referencing the import)
