#!/usr/bin/env python
# -*- coding: utf8 -*-

# Author: Gwennael Buchet <gwennael.buchet@gmail.com>
#
# This code is based on great MFRC-python library:
# https://github.com/mxgxw/MFRC522-python
# ***

import ConfigParser
import RPi.GPIO as GPIO
import signal
import time

import MFRC522

continue_reading = True
server_url = ""
reader_id = 0


# Read configuration from "zenibar.cfg" file
def read_config():
    global server_url, reader_id
    config = ConfigParser.RawConfigParser()
    config.read('zenibar.cfg')
    reader_id = config.get("READER", "ID")
    server_url = config.get("SERVER", "URL")


# Send
def send_to_server(userID):
    print("Sending to server " + server_url + " => " + userID)


# Capture SIGINT for cleanup when the script is aborted
def end_read(signal, frame):
    global continue_reading
    print "Ctrl+C captured, ending read."
    continue_reading = False
    GPIO.cleanup()


# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()

# Welcome message
print "Ready to read cards..."
print "Press Ctrl-C to stop."
read_config()

# This loop keeps checking for chips. If one is near it will get the UID and authenticate
while continue_reading:

    userID = ""

    # Scan for cards    
    (status, TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # Get the UID of the card
    (status, uid) = MIFAREReader.MFRC522_Anticoll()

    # If we have the UID, continue
    if status == MIFAREReader.MI_OK:

        # UID: str(uid[0]), str(uid[1]), str(uid[2]), str(uid[3])

        # This is the default key for authentication
        key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]

        # Select the scanned tag
        MIFAREReader.MFRC522_SelectTag(uid)

        # Authenticate
        status = MIFAREReader.MFRC522_Auth(MIFAREReader.PICC_AUTHENT1A, 8, key, uid)

        # Check if authenticated
        if status == MIFAREReader.MI_OK:
            # The values are stored in an array of 16 values, but we get them as a string representing an array
            userIDList = MIFAREReader.MFRC522_Read(8)
            # As all 16 values are the same (i.e. the userID), just pick one
            userID = userIDList.split(", ")[1]
            MIFAREReader.MFRC522_StopCrypto1()
            send_to_server(userID)
            # Wait few seconds so ensure not spamming the server
            time.sleep(4)

        else:
            print "Authentication error"
