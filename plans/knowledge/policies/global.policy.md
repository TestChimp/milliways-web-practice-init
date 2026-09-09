---
policy-kind: global
version: 1.0.0
---

## Coverage target

- percent: 80
- lifecycle_status: ready

## Test suite management

```yaml
tags:
  - value: smoke
    instructions: Apply @smoke to critical-path checks intended for every PR.
  - value: regression
    instructions: Apply @regression to broader coverage outside smoke.
```
