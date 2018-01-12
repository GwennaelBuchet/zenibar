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
                 registrationDate, lastvisitDate,
                 averageUptakesPerDay, habits, ponderationDays):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.registrationYear = registrationDate.year
        self.registrationMonth = registrationDate.month
        self.registrationDay = registrationDate.day
        self.registrationDate = registrationDate
        self.lastvisitYear = lastvisitDate.year
        self.lastvisitMonth = lastvisitDate.month
        self.lastvisitDay = lastvisitDate.day
        self.lastvisitDate = lastvisitDate
        self.averageUptakesPerDay = averageUptakesPerDay
        self.habits = habits
        # beers that fit the habits/preferences of this customer
        self.suitableBeers = []
        self.uptakes = []
        # ponderationDays correspond tho the percents of chance the customer will go to the bar for each day of the week
        self.ponderationDays = ponderationDays

    @staticmethod
    def generateName(indice):
        namesList = [["Adrien", "Legrand"], ["Gwennael", "Buchet"], ["Marcel", "Beliveau"], ["Sasha", "Foxxx"],
                     ["Jenna", "Haze"], ["Riley", "Reid"], ["Kobe", "Tai"], ["Daisie", "Marie"], ["Lisa", "Ann"],
                     ["Tori", "Black"], ["Jannice", "Griffith"], ["Emilie", "Grey"], ["Mia", "Khalifa"],
                     ["Cassidy", "Banks"], ["Régine", "Zylberberg"], ["Nikita", "Bellucci"]]
        firstnames = ["Amber", "Andy", "Natasha", "Sandy", "Aurora", "Susie", "Cathy", "Clara", "Coralie", "Erika",
                      "Estelle", "Jenna", "Kelly", "Teri", "Shannon", "Jasmin", "Stormy", "Dolly", "Gina", "Heather",
                      "Julia", "Marilyn", "Olivia", "Vanessa", "Nikita", "Brigitte"]
        lastnames = ["Labouche", "Storm", "Doll", "Lynn", "Vega", "Lord", "Kitty", "Angel", "Amor", "Dee", "Pecheresse",
                     "King", "Young", "Love", "Star", "Tits", "Moon", "Tekila", "Coco", "Shave", "Canelle", "Chocolat",
                     "Barbie", "Ladyboy", "Queer", "Dior", "Stone", "Kass", "Pink"]

        if indice < len(namesList):
            return namesList[indice]

        firstname = firstnames[math.ceil(random.random() * len(firstnames)) - 1]
        lastname = lastnames[(indice - len(namesList) - 1) % len(lastnames)]

        return [firstname, lastname]

    @staticmethod
    def generateFirstDate():
        delta = _td(math.ceil(random.random() * 60))
        return OPENING_DATE + delta

    @staticmethod
    def generateLastDate():
        delta = _td(math.ceil(random.random() * 30))
        return LAST_DATE - delta

    @staticmethod
    def generateAverageUptakes():
        return 1 + math.ceil(random.random() * 5)

    @staticmethod
    def generatePonderations():
        ponderations = []
        ponderations.append(random.random() / 5)  # monday
        ponderations.append(0.2 + random.random() / 3.5)  # tuesday
        ponderations.append(0.2 + random.random() / 3)  # wednesday
        ponderations.append(0.3 + random.random() / 2)  # thursday
        ponderations.append(0.35 + random.random() / 2)  # friday
        ponderations.append(0.66 + random.random() / 3)  # saturday
        ponderations.append(0)  # sunday. Bar is closed

        return ponderations

    @staticmethod
    def generateHabits():
        habits = []

        # strongness
        strongness = round(4 + random.random() * 5, 1)
        strongnessSign = "<" if math.copysign(1, -1 + random.random() * 2) < 0 else ">"
        if strongness <= 6:
            strongnessSign = ">"
        if strongness >= 9:
            strongnessSign = "<"
        habits.append("strongness" + strongnessSign + str(strongness))

        # style
        allStyles = ["'IPA'", "'Amber'", "'Belgian Pale Ale'", "'Belgian Dark Ale'", "'Lager'", "'Abbaye'", "'White'",
                     "'Alcool Free'", "'Extra Special Bitter'"]
        selectedStyles = []
        for s in allStyles:
            if random.random() < 0.5:
                selectedStyles.append(s)

        style = "style in [" + ", ".join(selectedStyles)
        style += "]"
        habits.append(style)

        # color
        allColors = ["'White'", "'Blond'", "'Amber'", "'Brown'", "'Black'"]
        selectedColors = []
        for i, c in enumerate(allColors):
            if random.random() < 0.5:
                selectedColors.append(c)
        color = "color in [" + ", ".join(selectedColors)
        color += "]"
        habits.append(color)

        return habits

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
        self.nbTotalUptakes = 0
        for customer in customers:
            self.addCustomer(customer)

    def addCustomer(self, customer):
        self.addSuitableBeersToCustomer(customer)
        while len(customer.suitableBeers) == 0:
            customer.habits = Customer.generateHabits()
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


def generateBeers():
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
    return beers


def generateCustomers():
    customers = []
    for i in range(0, NB_CUSTOMERS):
        name = Customer.generateName(i)
        firstDate = Customer.generateFirstDate()
        lastDate = Customer.generateLastDate()
        averageUptakesPerDay = Customer.generateAverageUptakes()
        habits = Customer.generateHabits()

        ponderationDays = Customer.generatePonderations()

        customers.append(
            Customer(i, name[0], name[1], firstDate, lastDate, averageUptakesPerDay, habits, ponderationDays)
        )
    return customers


def getTempetatureFactor(temperature):
    if temperature < 5:
        return 0.85
    if temperature > 22:
        return 2 - (22 / temperature)  # [1.04 ; 1.35]

    return 1


def getHumidityFactor(humidity):
    if humidity < 0.7:
        return 1.2
    if humidity > 0.9:
        return 0.8

    return 1


def willCustomerComeThisDay(customer, weather, singleDateTime):
    # dayPonderation = percent of chance the customer goes to the bar today
    # get standard ponderation for this customer for today
    chancesHeWillComeToday = customer.ponderationDays[singleDateTime.weekday()]

    # let's add some random to our ponderation, between -0.2 and + 0.2
    # dayPonderation += (-0.2 + math.ceil(random.random() * 0.4))
    # dayPonderation = max(0, min(1, dayPonderation))  # just to ensure to get in [0, 1] only

    # moderate ponderation with weather
    chancesHeWillComeToday *= getTempetatureFactor(weather.temperature)  # 0.85 ; 1 ; [1.04 ; 1.35]
    chancesHeWillComeToday *= getHumidityFactor(weather.humidity)  # 1.2 ; 1 ; 0.8

    # random=[0.0, 1.0], so it's convenient to compare with chances the customer will come today
    return random.random() < chancesHeWillComeToday


def generateUptakesFor1Customer(customer, weather, singleDateTime):
    """ Generates all the uptakes of a customer, based on its habits """

    if not willCustomerComeThisDay(customer, weather, singleDateTime):
        return None

    # generates a random number of uptakes, based on the user habits
    nbUptakes = max(0, customer.averageUptakesPerDay + (-1 + math.ceil(random.random() * 2)))
    # The further we are in the month, the lower money the customer have :/
    nbUptakes *= round(math.sin(0.03 * singleDateTime.day + math.pi / 2), 4) # [1; 0.6]

    nbSuitableBeers = len(customer.suitableBeers)

    if nbSuitableBeers == 0:
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

    h = round(currentAverage + (r / 10), 2)
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
    endDay = lastDay()

    customers = generateCustomers()
    beers = generateBeers()

    bar = Bar(beers, customers)

    # pre-compute an average humidity per month to speed-up computation of the weather conditions per day
    averageHumidityPerMonth = generateMonthsHumidity()

    # fill in each day from the opening of the bar with uptakes
    for singleDateTime in dateRange(OPENING_DATE, endDay):
        weather = generateWeather(singleDateTime, averageHumidityPerMonth)
        dailyUptakes = DailyUptakes(weather, singleDateTime)
        for customer in bar.customers:
            if customer.registrationDate <= singleDateTime and customer.lastvisitDate >= singleDateTime:
                uptakes = generateUptakesFor1Customer(customer, weather, singleDateTime)
                if uptakes != None:
                    dailyUptakes.uptakes.append(uptakes)
                    customerUptakes = CustomerDailyUptakes(singleDateTime, uptakes.beersId)
                    customer.uptakes.append(customerUptakes)
                    bar.nbTotalUptakes += len(uptakes.beersId)

        bar.dailyUptakes.append(dailyUptakes)

    return bar


##############################################################################

NB_CUSTOMERS = 50
OPENING_DATE = _dt(2012, 1, 1)
LAST_DATE = lastDay()
monthPonderations = [7, 8, 8.5, 9, 10, 10, 8.5, 6.5, 10, 10, 10, 6]

""" Start data generation """
bar = generateData()
with open('./zenibar_history.json', 'w+') as fu:
    fu.write(bar.to_JSON())

print(bar.nbTotalUptakes)
