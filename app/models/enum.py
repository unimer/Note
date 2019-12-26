import sys

class ColorEnum():
    colors = ['red', 'yellow', 'green', 'orange', 'blue']
    colorsEnum = enumerate(colors)

    def forSelect(key, value):
        return {
            'key': key,
            'value': value
        }
