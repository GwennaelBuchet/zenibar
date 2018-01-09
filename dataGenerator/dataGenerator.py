from datetime import datetime as _dt
from datetime import date as _date
from datetime import timedelta as _td
import math
import random
import json


class Beer:
    def __init__(self, id, brand, model, strongness, style, color):
        self.id = id
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

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


class Customer:
    """Un client et son historique"""

    def __init__(self, id, firstname, lastname,
                 registrationYear, registrationMonth, registrationDay,
                 lastvisitYear, lastvisitMonth, lastvisitDay,
                 averageUptakesPerDay, habits, ponderationDays):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.registrationYear = registrationYear
        self.registrationMonth = registrationMonth
        self.registrationDay = registrationDay
        self.registrationDate = _dt(registrationYear, registrationMonth, registrationDay)
        self.lastvisitYear = lastvisitYear
        self.lastvisitMonth = lastvisitMonth
        self.lastvisitDay = lastvisitDay
        self.lastvisitDate = _dt(lastvisitYear, lastvisitMonth, lastvisitDay)
        self.averageUptakesPerDay = averageUptakesPerDay
        self.habits = habits
        # beers that fit the habits/preferences of this customer
        self.suitableBeers = []
        self.uptakes = []
        # ponderationDays correspond tho the percents of chance the customer will go to the bar for each day of the week
        self.ponderationDays = ponderationDays

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


class Uptake:
    def __init__(self, customerId, beersId):
        self.customerId = customerId
        self.beersId = beersId

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


class DailyUptakes:
    """History of uptakes for 1 day"""

    def __init__(self, weather, singleDateTime):
        self.weather = weather
        self.year = singleDateTime.year
        self.month = singleDateTime.month
        self.day = singleDateTime.day
        self.uptakes = []

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


class CustomerDailyUptakes:
    """Une consommation par le client"""

    def __init__(self, singleDateTime, beersId):
        self.year = singleDateTime.year
        self.month = singleDateTime.month
        self.day = singleDateTime.day
        self.beersId = beersId

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


class Bar:
    def __init__(self, beers, customers):
        self.dailyUptakes = []
        self.beers = beers
        self.customers = []
        for customer in customers:
            self.addCustomer(customer)

    def addCustomer(self, customer):
        self.addSuitableBeersToCustomer(customer)
        self.customers.append(customer)

    def addBeer(self, beer):
        self.addSuitableBeerToCustomers(beer)
        self.beers.append(beer)

    def addSuitableBeersToCustomer(self, customer):
        """ Try to find beers in this bar which can fit customer's habits """
        for beer in self.beers:
            if beer.canMatch(customer.habits):
                customer.suitableBeers.append(beer)

    def addSuitableBeerToCustomers(self, beer):
        """ Try to find customers who can like this beer """
        for customer in self.customers:
            if beer.canMatch(customer.habits):
                customer.suitableBeers.append(beer)

    def _try(self, o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: self._try(o), sort_keys=True, indent=0,
                          separators=(',', ':')).replace(
            '\n', '')


class Weather:
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity

    def _try(o):
        try:
            return o.__dict__
        except:
            return str(o)

    def to_JSON(self):
        return json.dumps(self, default=lambda o: _try(o), sort_keys=True, indent=0, separators=(',', ':')).replace(
            '\n', '')


##############################################################################
""" Init Data """

# The bar got more or less customers depending on the month.
# This ponderations are betwwen 0 and 1 and correspond to the percent of chance people comes to the bar
monthPonderations = [0.5, 0.6, 0.6, 0.9, 1, 1, 0.9, 0.5, 1, 1, 1, 0.5]

beers = [Beer(1, "Kasteel", "Cuvée du Chateau", 11, "Belgian Pale Ale", "Brown"),
         Beer(2, "Rochefort", "10", 11.3, "Abbaye", "Brown"),
         Beer(3, "Rochefort", "8", 9.2, "Abbaye", "Brown"),
         Beer(4, "Saint Bernardus", "Abt 12", 10, "Belgian Pale Ale", "Brown"),
         Beer(5, "Cuvée des Trolls", "Blonde", 7, "Belgian Pale Ale", "Blond"),
         Beer(6, "Orval", "Blonde", 7, "Abbaye", "Amber"),
         Beer(7, "Brewdog", "Punk IPA", 5.6, "IPA", "Blond"),
         Beer(8, "Westmalle", "Triple", 9.5, "Abbaye", "Blond"),
         Beer(9, "Rince Cochon", "Blonde", 8.5, "Belgian Pale Ale", "Blond"),
         Beer(10, "Hinano", "", 5, "Lager", "Blond"),
         Beer(11, "La Levrette", "Blonde", 5, "Lager", "Blond"),
         Beer(12, "La Fée Torchette", "Blonde", 6.5, "Lager", "Blond"),
         Beer(13, "La Trappe", "Quadrupel", 10, "Belgian Pale Ale", "Amber"),
         Beer(14, "Kwak", "", 8.4, "Belgian Pale Ale", "Amber"),
         Beer(15, "Tripel Karmeliet", "", 8.4, "Belgian Pale Ale", "Blond"),
         Beer(16, "Omnipollo", "Omnipollo Fatamorgana", 8, "IPA", "Amber"),
         Beer(17, "Barbar", "Miel", 8, "Belgian Pale Ale", "Blond"),
         Beer(18, "Iron Maiden", "Trooper", 4.7, "Extra Special Bitter", "Blond"),
         Beer(18, "Gulden", "Drak", 10.7, "Belgian Dark Ale", "Brown"),
         Beer(19, "Delirium", "Tremens", 8.5, "Belgian Pale Ale", "Blond"),
         Beer(20, "Chimay", "Bleue", 9, "Belgian Dark Ale", "Brown"),
         Beer(21, "Angelus", "Blonde", 7, "Belgian Pale Ale", "Blond"),
         Beer(22, "Pietra", "", 6, "Lager", "Blond"),
         Beer(23, "Brewdog", "Nanny State", 0.5, "Alcool Free", "Blond"),
         Beer(24, "La Chouffe", "Blonde", 8, "Belgian Pale Ale", "Blond"),
         Beer(25, "Blue Moon", "White Ale", 5.4, "White", "White"),
         Beer(26, "Rousse du Mont Blanc", "W", 6.5, "Amber", "Amber")
         ]

customers = [
    Customer(1, "Adrien", "Legrand", 2016, 11, 2, 2018, 1, 23, 8,
             ["strongness>8", "style in ['IPA','Amber','Belgian Pale Ale']"], [0.2, 0.3, 0.3, 0.4, 0.8, 0.6, 0]),
    Customer(2, "Gwennael", "Buchet", 2016, 1, 3, 2018, 1, 23, 4,
             ["strongness>7", "style in ['IPA','Amber','Belgian Pale Ale','Abbaye']", "color!='Brown'"],
             [0.0, 0.1, 0.4, 0.4, 0, 0.05, 0]),
    Customer(3, "Marcel", "Beliveau", 2017, 1, 27, 2017, 6, 1, 2,
             ["strongness<7.5", "style in ['Lager','Belgian Pale Ale', 'White', 'Alcool Free']", "color in ['White', 'Blond', 'Amber']"],
             [0, 0, 0, 0, 0.8, 1, 0]),
    Customer(4, "Sasha", "Foxxx", 2017, 4, 12, 2018, 1, 23, 9,
             ["strongness>7.5", "style in ['IPA', 'Abbaye','Belgian Pale Ale']", "color in ['Blond', 'Amber']"],
             [0.5, 0.6, 0.4, 0.4, 0.8, 1, 0]),
    Customer(5, "Jenna", "Haze", 2017, 10, 9, 2017, 12, 21, 1,
             ["strongness<9",
              "style in ['Abbaye','Belgian Pale Ale', 'Lager', 'White']", "color in ['White', 'Blond', 'Amber', 'Brown']"],
             [0.0, 0.0, 0.2, 0.4, 0, 0.5, 0]),
    Customer(6, "Riley", "Reid", 2016, 1, 3, 2018, 1, 10, 7,
             ["style in ['Lager']", "color in ['Blond']"], [0.6, 0.6, 0.7, 0.8, 0.9, 1, 0]),
    Customer(7, "Kobe", "Tai", 2016, 6, 24, 2017, 11, 10, 2, ["style in ['IPA', 'Belgian Dark Ale']"],
             [0.0, 0.0, 0.2, 0.2, 0.3, 0.3, 0]),
    Customer(8, "Daisie", "Marie", 2016, 1, 3, 2018, 1, 23, 2,
             ["strongness>7",
              "style in ['Abbaye','Belgian Pale Ale', 'Lager', 'IPA']", "color in ['Blond', 'Amber', 'Brown']"],
             [0.9, 0.9, 0.8, 0.6, 1, 1, 0]),
    Customer(9, "Lisa", "Ann", 2016, 1, 23, 2018, 1, 23, 3,
             ["strongness>7",
              "style in ['Abbaye', 'Belgian Pale Ale', 'Lager']", "color in ['Blond', 'Amber']"],
             [0, 0.2, 0.2, 0.6, 0.8, 0.8, 0]),
    Customer(10, "Tori", "Black", 2016, 5, 13, 2018, 1, 23, 4,
             ["strongness<9",
              "style in ['Abbaye','Belgian Pale Ale', 'Belgian Dark Ale', 'IPA']", "color in ['Amber', 'Brown', 'Black']"],
             [0.2, 0.2, 0, 0, 0, 1, 0]),
    Customer(11, "Janice", "Griffith", 2016, 5, 13, 2018, 1, 23, 3,
             ["style in ['Abbaye','Belgian Pale Ale', 'Lager', 'IPA', 'Alcool Free', 'White']", "color in ['White', 'Blond', 'Amber', 'Brown']"],
             [0, 0.1, 0.25, 0.6, 0, 1, 0]),
    Customer(12, "Emilie", "Grey", 2016, 10, 2, 2018, 1, 23, 2,
             ["strongness<9",
              "style in ['Belgian Pale Ale', 'White', 'Alcool Free', 'Lager', 'IPA']", "color in ['White', 'Blond', 'Amber', 'Brown']"],
             [0.5, 0.5, 0.5, 0.5, 0.6, 0, 0]),
    Customer(13, "Mia", "Khalifa", 2017, 1, 4, 2017, 12, 20, 3,
             ["style in ['Abbaye','Belgian Dark Ale', 'IPA']", "color in ['Amber', 'Brown']"],
             [0.15, 0.15, 0.2, 0.3, 0.3, 0.5, 0]),
    Customer(14, "Cassidy", "Banks", 2016, 1, 3, 2018, 1, 8, 2,
             ["strongness>6", "strongness<10",
              "style in ['Abbaye','Belgian Pale Ale']", "color in ['Blond', 'Amber']"],
             [0, 0, 0.1, 0.1, 1, 0.8, 0]),
    Customer(15, "Régine", "Zylberberg", 2016, 3, 22, 2018, 1, 20, 4,
             ["strongness<9",
              "style in ['Belgian Pale Ale', 'lager', 'White']", "color in ['White', 'Blond', 'Amber', 'Brown']"],
             [0.6, 0.6, 0.7, 0.8, 1, 0.9, 0]),
    Customer(16, "Nikita", "Bellucci", 2017, 2, 1, 2018, 1, 10, 1,
             ["strongness<9",
              "style in ['Belgian Pale Ale']", "color in ['Blond', 'Amber', 'Brown']"],
             [0, 0, 0, 0.3, 0.5, 0.5, 0])
]

bar = Bar(beers, customers)


##############################################################################

def getTempetatureFactor(temperature):
    if temperature < 5:
        return 0.8
    if temperature > 22:
        return 2 - (22 / temperature)

    return 1


def getHumidityFactor(humidity):
    if humidity < 0.7:
        return 1.2
    if humidity > 0.9:
        return 0.7

    return 1


def generateUptakesFor1Customer(customer, weather, singleDateTime):
    """ Generates all the uptakes of a customer, based on its habits """

    # generates a random number of uptakes, based on the user habits
    nbUptakes = max(0, customer.averageUptakesPerDay + (-2 + math.ceil(random.random() * 3)))
    nbSuitableBeers = len(customer.suitableBeers)

    if nbSuitableBeers == 0:
        return None

    # dayPonderation = percent of chance the customer goes to the bar today
    dayPonderation = customer.ponderationDays[
        singleDateTime.weekday()]  # get standard ponderation for this customer for today
    dayPonderation += (
            -0.2 + math.ceil(random.random() * 0.4))  # let's add some random to our ponderation, between -0.2 and + 0.2
    dayPonderation = max(0, min(1, dayPonderation))  # just to ensure to get in [0, 1] only

    chancesHeWillComeToday = dayPonderation

    # moderate ponderation with usual frequentation of the bar in this period
    chancesHeWillComeToday *= monthPonderations[singleDateTime.month - 1]

    # moderate ponderation with weather
    chancesHeWillComeToday *= getTempetatureFactor(weather.temperature)
    chancesHeWillComeToday *= getHumidityFactor(weather.humidity)

    # random=[0.0, 1.0], so it's convenient to compare with chances the customer will come today
    customerComesToday = random.random() < chancesHeWillComeToday

    if not customerComesToday:
        return None

    beers = []

    while nbUptakes > 0:
        # find a suitable beer for the customer
        beer = customer.suitableBeers[math.ceil(random.random() * (nbSuitableBeers - 1))]
        beers.append(beer.id)
        nbUptakes = nbUptakes - 1

    return Uptake(customer.id, beers)


def generateWeather(singleDateTime, averageHumidityPerMonth):
    """ Generates aweather condition, based on the date """
    currentAverage = averageHumidityPerMonth[singleDateTime.month - 1]
    r = random.random()

    h = currentAverage + (r / 10)
    t = math.ceil(-10 + ((1 - currentAverage) * (50 + 25 * r)))

    return Weather(t, h)


def dateRange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + _td(n)


def lastDay():
    today = _dt.now()
    snowCampDay = _dt(2018, 1, 25)

    if snowCampDay < today:
        return today

    return snowCampDay


def generateMonthsHumidity():
    averageHumidityPerMonth = []
    for m in range(0, 12):
        averageHumidityPerMonth.append(math.fabs(math.sin((-6 + m) / 12)) + 0.4)  # to get values between 0.4 and 1

    return averageHumidityPerMonth


def generateData():
    openingDay = _dt(2016, 1, 1)
    endDay = lastDay()

    # pre-compute an average humidity per month to speed-up computation of the weather conditions per day
    averageHumidityPerMonth = generateMonthsHumidity()

    # fill in each day from the opening of the bar with uptakes
    for singleDateTime in dateRange(openingDay, endDay):
        weather = generateWeather(singleDateTime, averageHumidityPerMonth)
        dailyUptakes = DailyUptakes(weather, singleDateTime)
        for customer in bar.customers:
            if customer.registrationDate <= singleDateTime and customer.lastvisitDate >= singleDateTime:
                uptakes = generateUptakesFor1Customer(customer, weather, singleDateTime)
                if uptakes != None:
                    dailyUptakes.uptakes.append(uptakes)
                    customerUptakes = CustomerDailyUptakes(singleDateTime, uptakes.beersId)
                    customer.uptakes.append(customerUptakes)

        bar.dailyUptakes.append(dailyUptakes)


##############################################################################

""" Start data generation """
generateData()
with open('./zenibar_history.json', 'w+') as fu:
    fu.write(bar.to_JSON())
