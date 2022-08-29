import pymongo

class Database_Manager():    
    def __init__(self):
        self.db_credentials = "mongodb://192.168.1.222:27017/?ssl=false"
        self.connect = pymongo.MongoClient(self.db_credentials)
        print('***** Mongodb connection established *****')

    def fetchArray_withKey(self,database,collection, query):
        self.result = self.connect[database][collection].find(filter=query)
                
        return list(self.result)

    def insert(self,database,collection,values):
        dbnames = self.connect.list_database_names()
        if database in dbnames:
            print('***** Mongodb ' + database + ' Database connection established *****')
            if isinstance(values,list):
                self.connect[database][collection].insert_many(values)

            elif isinstance(values,dict):   
                result = self.connect[database][collection].insert_one(values)
                if result.acknowledged:
                    print('***** ' + collection + ' table 1 document(s) inserted *****')  

                else:
                    print('***** ' + collection + ' table no document(s) inserted *****') 


        else:
            print('***** ' + database + ' Database does not exist *****')

    def update_one(self,database,collection,condition,values):
        dbnames = self.connect.list_database_names()
        if database in dbnames:
            print('***** Mongodb ' + database + ' Database connection established *****')
            result = self.connect[database][collection].update_one(condition,values)
            if result.matched_count > 0:
                print('***** ' + collection + ' table ' + str(result.matched_count) +' document(s) updated *****')  

            else:
                print('***** ' + collection + ' table ' + str(result.matched_count) +' document(s) not updated *****') 

        else:
            print('***** ' + database + ' Database does not exist *****')

    def update_many(self,database,collection,condition,values):
        dbnames = self.connect.list_database_names()
        if database in dbnames:
            print('***** Mongodb ' + database + ' Database connection established *****')    
            result = self.connect[database][collection].update_many(condition,values)
            if result.matched_count > 0:
                print('***** ' + collection + ' table ' + str(result.matched_count) +' document(s) updated *****')  

            else:
                print('***** ' + collection + ' table ' + str(result.matched_count) +' document(s) not updated *****')  

        else:
            print('***** ' + database + ' Database does not exist *****')

    def delete_one(self,database,collection,values):
        dbnames = self.connect.list_database_names()
        if database in dbnames:
            print('***** Mongodb ' + database + ' Database connection established *****')    
            result = self.connect[database][collection].delete_one(values)
            if result.deleted_count > 0:
                print('***** ' + collection + ' table ' + str(result.deleted_count) +' document(s) deleted *****')  

            else:
                print('***** ' + collection + ' table ' + str(result.deleted_count) +' document(s) not deleted *****')  
        else:
            print('***** ' + database + ' Database does not exist *****')

    def delete_many(self,database,collection,values):
        dbnames = self.connect.list_database_names()
        if database in dbnames:
            print('***** Mongodb ' + database + ' Database connection established *****')    
            result = self.connect[database][collection].delete_many(values)
            if result.deleted_count > 0:
                print('***** ' + collection + ' table ' + str(result.deleted_count) +' document(s) deleted *****')  

            else:
                print('***** ' + collection + ' table ' + str(result.deleted_count) +' document(s) not deleted *****')  
        
        else:
            print('***** ' + database + ' Database does not exist *****')        

    def __del__(self):
        try:
            self.connect.close()
            print('***** Mongodb connection destructed *****')
        except:
            print('***** ERROR Mongodb connection not destructed *****')