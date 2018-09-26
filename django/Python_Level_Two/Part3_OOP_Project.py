#####################################
### WELCOME TO YOUR OOP PROJECT #####
#####################################

# For this project you will be using OOP to create a card game. This card game will
# be the card game "War" for two players, you an the computer. If you don't know
# how to play "War" here are the basic rules:
#
# The deck is divided evenly, with each player receiving 26 cards, dealt one at a time,
# face down. Anyone may deal first. Each player places his stack of cards face down,
# in front of him.
#
# The Play:
#
# Each player turns up a card at the same time and the player with the higher card
# takes both cards and puts them, face down, on the bottom of his stack.
#
# If the cards are the same rank, it is War. Each player turns up three cards face
# down and one card face up. The player with the higher cards takes both piles
# (six cards). If the turned-up cards are again the same rank, each player places
# another card face down and turns another card face up. The player with the
# higher card takes all 10 cards, and so on.
#
# There are some more variations on this but we will keep it simple for now.
# Ignore "double" wars
#
# https://en.wikipedia.org/wiki/War_(card_game)

from random import shuffle

# Two useful variables for creating Cards.
SUITE = 'H D S C'.split()
RANKS = '2 3 4 5 6 7 8 9 10 J Q K A'.split()

class Card:
    def __init__(self, number, symbol):
        self.number = number
        self.symbol = symbol
        self.status = 'unassigned'
        self.assignee = ''
    
    def __str__(self):
        return "Number: {} Symbol: {} Status: {}".format(self.number, self.symbol, self.status)
    
    
         
class Deck:
    """
    This is the Deck Class. This object will create a deck of cards to initiate
    play. You can then use this Deck list of cards to split in half and give to
    the players. It will use SUITE and RANKS to create the deck. It should also
    have a method for splitting/cutting the deck in half and Shuffling the deck.
    """
    def __init__(self):
        self.cards = [Card(v, s) for v in RANKS for s in SUITE]
        
    def shuffle(self):
        shuffle(self.cards)
    
    def __str__(self):
        print(len(self.cards))
        for c in self.cards:
            print(c)
        return ""
            
            

class Hand:
    '''
    This is the Hand class. Each player has a Hand, and can add or remove
    cards from that hand. There should be an add and remove card method here.
    '''
    pass

class Player:
    """
    This is the Player class, which takes in a name and an instance of a Hand
    class object. The Payer can then play cards and check if they still have cards.
    """
    def __init__(self, name):
        self.name = name
        self.cards = []
        self.score = 0
        self.card_index = 0
    
    def play(self):
        return self.cards.pop()
    
    def incrementScore(self):
        self.score += 1
        
    def getScore(self):
        return self.score

class Controller:
    def __init__(self):
        self.deck = Deck()
        self.p1 = Player("Player 1")
        self.p2 = Player("Player 2")
        self.index = 0
    
    def deal(self):
        self.deck.shuffle()
        for index in range(0, len(self.deck.cards), 2):
            self.p1.cards.append(self.deck.cards[index])
            self.p2.cards.append(self.deck.cards[index+1])
        
    
    def play(self):
        index = 0
        while index < 52:
            c1 = self.p1.play()
            c2 = self.p2.play()
            if c1.number > c2.number:
                self.p1.incrementScore()
            else:
                self.p2.incrementScore()
            index += 2
        if self.p1.getScore() > self.p2.getScore():
            print("P1 Wins: {} vs {}".format(self.p1.getScore(), self.p2.getScore()))
        else:
            print("P2 Wins: {} vs {}".format(self.p2.getScore(), self.p1.getScore()))
            
######################
#### GAME PLAY #######
######################
print("Welcome to War, let's begin...")

cntrl = Controller()
cntrl.deal()
cntrl.play()



# Use the 3 classes along with some logic to play a game of war!
