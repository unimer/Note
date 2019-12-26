
def str2bool(data):
    if (data == None):
        return None
    boolean = "True"
    return boolean.lower() in data

def adaptor(data):
    dataList = data.split(",")
    intList = []
    for data in dataList:
        intList.append(int(data))
    
    return intList