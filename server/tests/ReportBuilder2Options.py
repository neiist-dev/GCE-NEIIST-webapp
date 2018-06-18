import os.path
from datetime import datetime
import sys
import time

# Generates test cases to be used with Mocha and Chai
counters = [0] * 16
counters2 = [0] * 16
beggining = time.time()

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
TestsDoubleOne = os.path.join(save_path, "testsDoubleOne" + str(now) + ".txt")
TestsDoubleTwo = os.path.join(save_path, "testsDoubleTwo" + str(now) + ".txt")
path2 = os.path.join(save_path, "resultsDouble " + str(now) + ".txt")

file2 = open(TestsDoubleTwo, "w")
file1 = open(TestsDoubleOne, "w")
resultados = open(path2, "w")

for i in range(0, 427):
    for l in range (1,2):
        nb = input('Choose course 1: ' + "\n")
        nb2 = input('Choose course 2: ' + "\n")

        if (not num_there(nb)):
            print("=============")
            continue



        if ((eval(nb)) > 15):
            nb = str(4)
            print("Mistake. Classifying as Software Engineering")

        if ((eval(nb2)) > 15):
            nb2 = str(4)

            print("Mistake. Classifying as Software Engineering")

        if (eval(nb) == 0):
            counters[4] += 1

        if (eval(nb2) == 0):
            counters2[4] += 1

        if (nb == "-1" or nb2 == "-1"):
            end = time.time()
            delta = end - beggining

            print (counters)
            print (counters2)
            counters[0] = 0
            #Collects stats and writes in file
            resultados.write("=============")

            resultados.write("\nMain Counter :" + str(counters) + "\n")
            resultados.write("Secondary Counter:" + str(counters2) + "\n")
            resultados.write("=============\n")

            for l in range (1,16):
                print(l)
                cadeira = switcha(str(l))
                print(cadeira)
                parcial = round((counters[l]/(i))*100,1)
                parcial2 = round(((counters[l]+counters2[l])/((i)*2))*100,1)



                resultados.write(cadeira + ":\n" + "Parcial: " + str(parcial) + "% - " + str(counters[l]) + "\n")
                resultados.write("Total: " + str(parcial2) + "% - " + str(counters[l]+counters2[l]) + "\n\n")

            resultados.write("\nTime Classifying: " + str(round((delta/60),1)) + "m")
            resultados.write("\n\nParcial Time: " + str(i) + " out of 427")
            resultados.write("\n\nTOTAL: " + str(i*2) + " out of 854")



            print("Evaluated " + str(i) + " theses.")

            sys.exit()
        counters[eval(nb)] += 1
        counters2[eval(nb2)] += 1
        cadeira = switcha(nb)
        cadeira2 = switcha(nb2)

        #Write results to file
        #odd numbers are main classifications
        resultados.write(cadeira + "\n")
        resultados.write(cadeira2 + "\n")

        #Write tests to file
        print("\n" + cadeira)
        print(cadeira2 + "\n" + "------")
        string = "it('Test" + str(i) + "-1', function(done) {" + \
                 "\n" + "\t" + "console.log(thesesClassifier.theses2017[" + str(i) + "]);" \
                 "\n" + "\t" + "console.log('================');" +\
                 "\n" + "\t" + "console.log(thesesClassifier.theses2017[" + str(i) + "].title);" \
                 "\n" + "\t" + "console.log('================');" + \
                 "\n" + "\t" + "console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[" + str(i) + "], classifier));" \
                "\n" + "\t" + "expect(thesesClassifier.classify(thesesClassifier.theses2017[" + str(i) + "],classifier, CLASS_TYPE)).to.be.equal('" + cadeira + "');" + \
                 "\n" + "\t" + "done();" + "\n" + "});" + "\n" + "\n"
        file2.write(string)
        file1.write(string)
        string2 = "it('Test" + str(i) + "-2', function(done) {" + \
                "\n" + "\t" + "expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[" + str(i) + "],classifier, CLASS_TYPE2)[1]).to.be.equal('" + cadeira2 + "');" + \
                 "\n" + "\t" + "done();" + "\n" + "});" + "\n" + "\n"
        file2.write(string2)

file2.close()
resultados.close()
file1.close()
