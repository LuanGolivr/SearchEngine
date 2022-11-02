import collections
from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
import re

def getTheLinks(urlLink):
    global alreadyCrawled, data

    caching = set()
    try:
        url = urlopen(urlLink)
        bsobj = soup(url.read(), features="html.parser")
    except:
        return

    for contentLink in bsobj.findAll('a'):
        if 'href' in contentLink.attrs and contentLink.attrs['href'] not in caching:
            linkcaught = contentLink.attrs['href']

            if linkcaught[0:2] == "//":
                new_link = "https:"
                new_link += linkcaught
            elif linkcaught[0:1] == "/":
                new_link = "https://g1.globo.com"
                new_link += linkcaught
            else:
                new_link = linkcaught

            alreadyCrawled.append(new_link)
            caching.add(linkcaught)
    return


def getInfos(urlLink):

    current_dict = collections.defaultdict(list)
    current_dict["link"] = urlLink

    try:
        url = urlopen(urlLink)
        bsobj = soup(url.read(), features="html.parser")
    except:
        return

    for contentLink in bsobj.findAll('meta'):
        if 'name' in contentLink.attrs and contentLink.attrs['name'] == "description":
            current_dict["description"] = contentLink.attrs['content']

        if 'name' in contentLink.attrs and contentLink.attrs['name'] == "keywords":
            current_dict["keywords"] = contentLink.attrs['content']

    contentLink = bsobj.findAll('title')
    current_dict["title"] = contentLink[0].text
    data.append(current_dict)

    return

start = "https://g1.globo.com"

visited = set()
visited.add(start)

alreadyCrawled = []
data = []

getTheLinks(start)

for i in range(len(alreadyCrawled)):
    page = alreadyCrawled[i]
    if page not in visited:
        getInfos(page)
        visited.add(page)



