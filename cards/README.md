# Reader and Writer for RFID-RC522 cards.

For information about card, wires and code, please have a look at: 
http://www.instructables.com/id/RFID-RC522-Raspberry-Pi/


Each RFID card contains only 1 data: the userID.
UOther user data is stored in the main server. RFID cards are only used to identify the costumers.

## WriteCard.py
_Arguments_:
- ID of the customer

_Usage_ (example for the customer with ID 1234): 
```shell
python WriteCard.py 1234
``` 
will write the code "1234" on the card and exit.

 
## ReadCards.py
_Arguments_:
- ID of the reader/BeerPump. There may be several beerPumps in the bar, they need to be identified. 

_Usage_: 
```shell
python ReadCards.py 1
``` 
will read the customer code from the RFID card and send it to the main server.
The parameter ('1' in this example) is the ID of the reader
 
