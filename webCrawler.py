import collections
import pymongo
import pprint
from urllib.request import urlopen
from bs4 import BeautifulSoup as soup

def getTheLinks(urlLink):
    global alreadyCrawled, allLinks

    try:
        url = urlopen(urlLink)
        bsobj = soup(url.read(), features="html.parser")
    except:
        return

    for contentLink in bsobj.findAll('a'):
        if 'href' in contentLink.attrs and contentLink.attrs['href'] not in alreadyCrawled:
            linkcaught = contentLink.attrs['href']

            alreadyCrawled.add(linkcaught)
            allLinks.append(linkcaught)
    return


def getInfos(urlLink):

    current_dict = collections.defaultdict(list)
    #url
    current_dict["link"] = urlLink

    try:
        url = urlopen(urlLink)
        bsobj = soup(url.read(), features="html.parser")
    except:
        return

    #description
    for contentLink in bsobj.findAll('meta'):
        if 'name' in contentLink.attrs and contentLink.attrs['name'] == "description":
            current_dict["description"] = contentLink.attrs['content']
            break

    if current_dict["description"] == '' and bsobj.find('content-text__container').text:
        firstPg = bsobj.find('content-text__container').text
        current_dict["description"] = firstPg

    #keywords
    for pageTitle in bsobj.findAll('h1'):
        if 'class' in pageTitle.attrs and pageTitle.attrs["class"][0] == "content-head__title":
            allWords = pageTitle.contents[0].split()
            invalidWords: set = {"a", "ante", "após", "até", "com", "contra", "de", "desde", "em", "entre", "para", "per",
                            "perante", "por"
                , "sem", "sob", "sobre", "trás", "afora", "como", "conforme", "durante", "exceto", "mediante", "menos",
                            "salvo", "que","e",
                            "segundo", "visto", "ao", "aos", "na", "nas", "no", "nos", "da", "das", "do", "dos",
                            "daquilo", "naquele", "numa",
                            "aquilo"}
            for word in allWords:
                if word.lower() not in invalidWords:
                    current_dict["keywords"].append(word.lower())
            break

    arr = []
    if current_dict["keywords"] == '':
        current_dict["keywords"] = arr


    #title
    contentLink = bsobj.findAll('title')
    if contentLink:
        current_dict["title"] = contentLink[0].text
    data.append(current_dict)

    return

def InsertInfosToMongo():
    try:
        client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
        mydb = client['SearchEngine']
        collec = mydb['news']
    except:
        print('Something went wrong')
        return

    for i in range(len(data)):
        collec.insert_one(data[i])

    return



start = "https://g1.globo.com/"

visited = set()
alreadyCrawled = set()
allLinks = []
data = []

visited.add(start)

getTheLinks(start)
print("primeiro link acessado")
index = 0

print("entrando no while")
while index <= 500:
    if allLinks[index] not in visited:
        page = allLinks[index]
        #getTheLinks(page)
        getInfos(page)
        visited.add(page)
        print("finalizado")
        print(index)
        print(len(alreadyCrawled))


    index += 1

InsertInfosToMongo()





