## Pipes Module
***
Pipes included in this module should only be added here if they are going to be generic enough to be reused somewhere else within the project. 

Exception: 
- payroll-details-totals.pipe.ts - This pipe was created before.

If you need to create a pipe for a particular use-case like "payroll-details-totals.pipe.ts", it is wise to create some sort of folder named "util", "shared", etc inside of the module that you're working in. This will allow us to create more targeted pipes that can assist in rendering UI and will be more locally sourced and won't bloat `pipes.module.ts`. 