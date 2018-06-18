import os.path
from datetime import datetime
# Generates test cases to be used with Mocha and Chai
counters = [0] * 16


def num_there(s):
    return any(i.isdigit() for i in s)

def switcha(x):
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

save_path = './'
now = datetime.now().timestamp()
completeName = os.path.join(save_path, "testsSimple" + str(now) + ".txt")
path2 = os.path.join(save_path, "resultsSimple " + str(now) + ".txt")

file1 = open(completeName, "w")
resultados = open(path2, "w")

for i in range(0, 427):
    nb = input('Choose course (number 1 - 15): ' + "\n")

    if (not num_there(nb)):
        print("=============")
        continue
    if ((eval(nb)) > 15):
        nb = str(4)
        print("Mistake. Classifying as Software Engineering")

    if (eval(nb) == 0):
        counters[4]+= 1

    if (nb == "-1"):
        print (counters)
        counters[0] = 0
        #Collects stats and writes in file
        resultados.write("\n\n=============\n\n")

        for l in range (1,16):
            print(l)
            cadeira = switcha(str(l))
            print(cadeira)
            parcial = round((counters[l]/(i))*100,1)
            resultados.write(cadeira + " : " + str(counters[l]) + " theses(" + str(parcial) + ")%" + "\n\n")

        resultados.write("\n\nTOTAL: " + str(i) + " out of 427")



        print("Evaluated " + str(i) + " theses.")


        break
    counters[eval(nb)] += 1
    cadeira = switcha(nb)

    #Write results to file
    resultados.write(cadeira + "\n")

    #Write tests to file
    print("\n" + cadeira + "\n" + "------")
    string = "it('Test" + str(i) + "', function(done) {" + \
             "\n" + "\t" + "console.log(thesesClassifier.theses2017[" + str(i) + "]);" \
             "\n" + "\t" + "console.log('================');" +\
             "\n" + "\t" + "console.log(thesesClassifier.theses2017[" + str(i) + "].title);" \
             "\n" + "\t" + "console.log('================');" + \
             "\n" + "\t" + "console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[" + str(i) + "], classifier));" \
            "\n" + "\t" + "expect(thesesClassifier.classify(thesesClassifier.theses2017[" + str(i) + "],classifier, CLASS_TYPE)).to.be.equal('" + cadeira + "');" + \
             "\n" + "\t" + "done();" + "\n" + "});" + "\n" + "\n"
    file1.write(string)

file1.close()

