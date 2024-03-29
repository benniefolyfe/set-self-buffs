# Set Self-Buffs

Please visit the [Set Self-Buffs](https://habitica.fandom.com/wiki/Set_Self-Buffs) Habitica Wiki page for detailed setup instructions.

## Summary

Set Self-Buffs allows a user to modify their stat (STR, INT, CON, PER) buff values to any custom value without affecting the buffs of others in their party. It can be run as often as needed during the day to modify buffs or set them back to a baseline value.

There are two versions of this add-on:

1. **[Set Self-Buffs (Script)](https://habitica.fandom.com/wiki/Set_Self-Buffs#Set_Self-Buffs_(Script))**: This version is a manually-driven script, which means it is run in Google Apps Script rather than through the Habitica user interface.
2. **[Set Self-Buffs (Habitica)](https://habitica.fandom.com/wiki/Set_Self-Buffs#Set_Self-Buffs_(Habitica))**: This version is an event-driven script, which means it creates reward task buttons in your Habitica user interface.

## Tips

- This script can be used to increase or decrease your buffs.
- Use the [Script version](https://habitica.fandom.com/wiki/Set_Self-Buffs#Set_Self-Buffs_(Script)) to explore different customizations to meet your specific goals before setting up the [Habitica version](https://habitica.fandom.com/wiki/Set_Self-Buffs#Set_Self-Buffs_(Habitica)).
- To zero out stats gained from buffs as well as leveling and equipment, enter negative values in lines 8-11. This will set a negative buff which will counteract the stat gains from other sources.
