# Node Wrapper for Das Keyboard Q REST API
Promise based node wrapper for the Das Q Keyboard API.

## API
* `clients` (Gets 3rd party clients)
* `colors` (Get predefined colors)
* `createSignal(name, pid, zoneId, color, effect)` (Create a signal)
* `devices` (List devices linked to your account)
* `deviceDefinitions` (List available device definitions)
* `effects(pid)` (Get available effects for a device)
* `removeSignal(id)` (Delete a signal)
* `revokeClient(id)` (Revoke 3rd party)
* `signals` (List signals)
* `zones` (List device zones, aka keys)

```
(function() {
    var dasqWrapper = require('./lib/dasq');
    var dasq = new dasqWrapper(process.env.CLIENTID, process.env.SECRET);
    return dasq.signals().then(function(result) {
        console.log(result);
});
```
