countdown timer state:
 - time limit (int seconds)
 - counting (boolean)
 - paused (boolean)
 - current time (int seconds)

reducer/actions:
 - set time limit
   - time limit = time limit
   - counting = false
   - paused = false
   - current time = time limit
 - reset:
   - counting = false
   - paused = false
   - current time = state.time limit
 - start:
   - counting = true
   - paused = false
 - pause:
   - counting = true
   - paused = true
 - tick:
   - current time = counting && !paused ? current time - 1 : current time;