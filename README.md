# pnq - Parse and Query HTML

## Extremely fast and a joy to use, but very much not for everyone

The motivation for this library arose after I embarked on a data science project that requires extracting content from a great number of very large HTML files.  The existing parsing and querying solutions were all too slow and/or memory-hungry for my needs (unless I was willing to throw a bit of money at the problem, which I wasn't) and I also just like writing code (ah, that smells more like the *real* reason for my wheel reinvention), thus pnq was born.  I also wanted to get some experience using typescript for npm development, so it was really win-win all around.

Please note that while this little library scratches my own itch quite satisfactorily, it is FAR from robust and will fall down in a number of cases. This result was arrived at with deliberation, as I didn't want the library to get slower and larger just so it could handle every edge case imaginable and every someday/maybe use-case to boot.  I wanted it to be small and simple and fast and work correctly for 100% of my needs.  Your needs may (and probably do) vary, so tread carefully and test well if you decide to make use.  

Feel free to fork away if you need extra functionality or to submit a pull request if you find a bug and its solution.  Happy coding!