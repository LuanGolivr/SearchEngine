from bs4 import BeautifulSoup
import requests

htmlText = requests.get('https://g1.globo.com/').text
soup = BeautifulSoup(htmlText, 'lxml')
tag = soup.findAll('a')
print(tag)

