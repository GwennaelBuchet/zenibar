from datetime import datetime as _dt
from datetime import date as _date
from datetime import timedelta as _td
import math
import random
import json


class Beer:
    def __init__(self, brand, model, strongness, style, color):
        self.brand = brand
        self.model = model
        self.strongness = strongness
        self.style = style
        self.color = color

    def canMatch(self, conditions):
        for condition in conditions:
            if eval("self." + condition) == False:
                return False
        return True

    def toJSON(self):
        return json.dumps(self.__dict__)


class Uptake:
    """Une consommation par le client"""

    def __init__(self, beer, customer):
        self.beer = beer
        self.customer = customer

    def toJSON(self):
        return json.dumps(self.__dict__)


class Customer:
    """Un client et son historique"""

    def __init__(self, id, firstname, lastname, registrationyear, registrationmonth, registrationday,
                 averageUptakesPerDay, habits):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.registrationyear = registrationyear
        self.registrationmonth = registrationmonth
        self.registrationday = registrationday
        self.registrationDate = _dt(registrationyear, registrationmonth, registrationday)
        self.averageUptakesPerDay = averageUptakesPerDay
        self.habits = habits
        self.history = []
        # beers that fit the habits/preferences of this customer
        self.suitableBeers = []

    def toJSON(self):
        return json.dumps(self.__dict__)


class DailyUptakes:
    """History of uptakes for 1 day"""

    def __init__(self, weather, year, month, day):
        self.weather = weather
        self.year = year
        self.month = month
        self.day = day
        self.uptakes = []

    def toJSON(self):
        return json.dumps(self.__dict__)


class Bar:
    def __init__(self, beers, customers):
        self.dailyUptakes = []
        self.beers = beers
        self.customers = []
        for customer in customers:
            self.addCustomer(customer)


    def addCustomer (self, customer):
        self.addSuitableBeersToCustomer(customer)
        self.customers.append(customer)

    def addBeer (self, beer):
        self.addSuitableBeerToCustomers(beer)
        self.beers.append(beer)

    def addSuitableBeersToCustomer (self, customer):
        """ Try to find beers in this bar which can fit customer's habits """
        for beer in self.beers:
            if beer.canMatch(customer.habits):
                customer.suitableBeers.append(beer)

    def addSuitableBeerToCustomers (self, beer):
        """ Try to find customers who can like this beer """
        for customer in self.customers:
            if beer.canMatch(customer.habits):
                customer.suitableBeers.append(beer)

    def toJSON(self):
        return json.dumps(self.__dict__)


class Weather:
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity

    def toJSON(self):
        return json.dumps(self.__dict__)


##############################################################################
""" Init Data """

beers = [Beer("Kasteel", "Cuvée du Chateau", 11, "Belgian Pale Ale", "Brown"),
         Beer("Rochefort", "10", 11.3, "Abbaye", "Brown"),
         Beer("Rochefort", "8", 9.2, "Abbaye", "Brown"),
         Beer("Saint Bernardus", "Abt 12", 10, "Belgian Pale Ale", "Brown"),
         Beer("Cuvée des Trolls", "Blonde", 7, "Belgian Pale Ale", "Blond"),
         Beer("Orval", "Blonde", 7, "Abbaye", "Amber"),
         Beer("Brewdog", "Punk IPA", 5.6, "IPA", "Blond"),
         Beer("Westmalle", "Triple", 9.5, "Abbaye", "Blond"),
         Beer("Rince Cochon", "Blonde", 8.5, "Belgian Pale Ale", "Blond"),
         Beer("Hinano", "Hinano", 5, "Lager", "Blond"),
         Beer("La Levrette", "Blonde", 5, "Lager", "Blond"),
         Beer("La Fée Torchette", "Blonde", 6.5, "Lager", "Blond"),
         Beer("La Trappe", "Quadrupel", 10, "Belgian Pale Ale", "Amber"),
         Beer("Kwak", "", 8.4, "Belgian Pale Ale", "Amber"),
         Beer("Tripel Karmeliet", "Triple", 8.4, "Belgian Pale Ale", "Blond"),
         Beer("Omnipollo", "Omnipollo Fatamorgana", 8, "IPA", "Amber"),
         Beer("Barbar", "Miel", 8, "Belgian Pale Ale", "Blond")
         ]

customers = [
    Customer("1", "Adrien", "Legrand", 2016, 11, 2, 8,
             ["strongness>8", "style in ['IPA','Amber','Belgian Pale Ale']"]),
    Customer("2", "Gwennael", "Buchet", 2016, 1, 3, 4,
             ["strongness>7", "style in ['IPA','Amber','Belgian Pale Ale','Abbaye']", "color!='Brown'"]),
    Customer("3", "Marcel", "Beliveau", 2017, 4, 27, 2,
             ["strongness<7.5", "style in ['Lager','Belgian Pale Ale']", "color in ['Blond', 'Amber']"]),
    Customer("4", "Janis", "Joplin", 2017, 4, 12, 9,
             ["strongness>7.5", "style in ['IPA', 'Abbaye','Belgian Pale Ale']", "color in ['Blond', 'Amber']"]),
    Customer("5", "Josephine", "Angegardien", 2017, 10, 9, 1,
             ["strongness<9",
              "style in ['Abbaye','Belgian Pale Ale', 'Lager']", "color in ['Blond', 'Amber', 'Brown']"]),
    Customer("6", "Homer", "Simpson", 2016, 1, 3, 7,
             ["style in ['Lager']", "color in ['Blond']"]),
    Customer("7", "Apu", "Nahasapeemapetilon", 2016, 6, 24, 2, ["style in ['IPA']"]),
    Customer("8", "Barney", "Gamble", 2016, 1, 3, 7,
             ["strongness>7",
              "style in ['Abbaye','Belgian Pale Ale', 'Lager', 'IPA']", "color in ['Blond', 'Amber', 'Brown']"])
]

bar = Bar(beers, customers)


##############################################################################

def generateUptake(customer, singleDate):
    return 0


def generateDailyUptakesFor1Customer(customer, singleDate, weather):
    """ Generates all the uptakes of a customer, based on its habits """

    # generates a random number of uptakes, based on the user habits
    nbUptakes = max(0, customer.averageUptakesPerDay + (-2 + math.ceil(random.random() * 3)))

    while nbUptakes > 0:
        #find a suitable beer for the customer
        for b in customer.suitableBeers:
           print (b.toJSON())

        nbUptakes = nbUptakes - 1


def generateWeather(singleDate, averageHumidityPerMonth):
    """ Generates aweather condition, based on the date """
    currentAverage = averageHumidityPerMonth[singleDate.month - 1]
    r = random.random()

    h = currentAverage + (r / 10)
    t = math.ceil(-10 + ((1 - currentAverage) * (50 + 25 * r)))

    return Weather(t, h)


def dateRange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + _td(n)


def generateData():
    today = _dt.now()
    openingday = _dt(2016, 1, 1)

    averageHumidityPerMonth = []
    for m in range(0, 12):
        averageHumidityPerMonth.append(math.fabs(math.sin((-6 + m) / 12)) + 0.4)

    # fill in each day from the opening of the bar
    for singleDate in dateRange(openingday, today):
        weather = generateWeather(singleDate, averageHumidityPerMonth)
        for customer in bar.customers:
            if customer.registrationDate <= singleDate:
                generateDailyUptakesFor1Customer(customer, singleDate, weather)


##############################################################################

generateData()
