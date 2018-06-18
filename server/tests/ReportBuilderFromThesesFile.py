import os.path

def getCourse(x):
    return {
            '1' : "Algorithms and Applications",
           '2': "Bioinformatics and Computational Biology",
           '3': "Cyber-Security",
           '4': "Software Engineering",
           '5': "Data Science and Engineering",
           '6': "It Service Management",
           '7': "Interaction and Visualization",
           '8': "Games",
           '9': "Intelligent Robotics",
           '10': "Cyberphysical Systems",
           '11': "Information Systems",
           '12': "Distributed Systems",
           '13': "Enterprise Systems",
            '14': "Intelligent Systems",
            '15' : "Language and Information Technologies"
    }.get(x, 'Software Engineering')
def getIndex(x):
    return {
            'Algorithms and Applications' : 1,
           'Bioinformatics and Computational Biology': 2,
           'Cyber-Security': 3,
           'Software Engineering': 4,
           'Data Science and Engineering': 5,
           'It Service Management': 6,
           'Interaction and Visualization': 7,
           'Games': 8,
           'Intelligent Robotics': 9,
           'Cyberphysical Systems': 10,
           'Information Systems': 11,
           'Distributed Systems': 12,
           'Enterprise Systems': 13,
            'Intelligent Systems': 14,
            'Language and Information Technologies' : 15
    }.get(x, 4)

save_path = './'
path = os.path.join(save_path, "ThesesReport17_18 - 1S.txt")
resultados = open(path, "w")

classMain = [0] * 16
classSec = [0] * 16

with open('AllThesis.txt') as input:
    lines = input.readlines()

#Build theses vector
for i in range (0,len(lines)):
    if (i%2 == 0):
        #Main class
        index = getIndex(lines[i].rstrip("\n"))
        classMain[index] += 1

    else:
        index = getIndex(lines[i].rstrip("\n"))
        classSec[index] += 1


i = len(lines)//2

#Build report
for l in range(1, 16):
    cadeira = getCourse(str(l))
    parcial = round((classMain[l] / (i)) * 100, 1)
    parcial2 = round(((classMain[l] + classSec[l]) / ((i) * 2)) * 100, 1)

    resultados.write(cadeira + ":\n" + "Parcial: " + str(parcial) + "% - " + str(classMain[l]) + "\n")
    resultados.write("Total: " + str(parcial2) + "% - " + str(classMain[l] + classSec[l]) + "\n\n")

resultados.write("\n\nTOTAL PARCIAL: " + str(i) + " out of " + str(i))
resultados.write("\n\nTOTAL: " + str(i * 2) + " out of " + str(i * 2))

print("Report build from " + str(i) + " theses.")


input.close()
resultados.close()