//using Entities.User;
//using MongoDB.Driver;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DataAccessLayer.MongoDb
//{
//    public class MongoRepository
//    {
//        private readonly IMongoCollection<User> _usersCollection;
//        // Eğer başka koleksiyonlar da kullanacaksanız, onların IMongoCollection nesnelerini burada tanımlayabilirsiniz.

//        public MongoRepository(string connectionString, string databaseName)
//        {
//            var client = new MongoClient(connectionString);
//            var database = client.GetDatabase(databaseName);
//            _usersCollection = database.GetCollection<User>("Users");
//        }

//        public async Task<IEnumerable<User>> GetUsersAsync()
//        {
//            return await _usersCollection.Find(u => true).ToListAsync();
//        }

//        public async Task AddUserAsync(User user)
//        {
//            await _usersCollection.InsertOneAsync(user);
//        }

//    }
//}
