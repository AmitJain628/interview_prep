class Twitter {
    public static int timeStamp = 0;

    class Tweet {
       int id;
       int timestamp;
       Tweet next;

       public Tweet(int id) {
        this.id = id;;
        this.timestamp = timeStamp++;
        this.next = null;
       }
    }
    class User {
        int userId;
        Tweet head;
        Set<Integer> followers;

        public User(int userId) {
            this.userId = userId;
            this.followers = new HashSet<Integer>();
            this.follow(this.userId);

        }

        public void follow(int id) {
            this.followers.add(id);
        }

        public void unfollow(int id) {
            if (id !== this.id) this.followers.remove(id);
        }

        public void postTweet(int tweetId) {
            Tweet newTweet = new Tweet(tweetId);
            newTweet.next = this.head;
            this.head = newTweet;
        }
    }

    public HashMap<Integer, User> userMap;

    public Twitter() {
        this.userMap = new HashMap<Integer, User>();
    }

    public void postTweet(int userId, int tweetId) {
        if(!this.userMap.containskey(userId)) {
            User user = new User(userId);
            this.userMap.put(userId, user);
        }

        this.userMap.get(userId).postTweet(tweetId);
    }

    public void unfollow(int followerId, int followeeId) {
        if (!userMap.containsKey(followerId) || followerId === followeeId) {
            return
        }

        thi.userMap.get(followerId).unfollow(followeeId);
    }

    public void follow(int followerId, int followeeId) {
        if (!userMap.containsKey(followerId)) {
            User user = new User(followerId);
            this.userMap.put(followerId, user);
        }

        if (!userMap.containsKey(followeeId)) {
            User user = new User(followeeId);
            this.userMap.put(followeeId, user);
        }

        this.userMap.get(followerId).follow(followeeId);
    }

    public List<Integer> getNewsFeed(int userId) {
        List<Integer> newsFeeds = new ArrayList<Integer>();

        if(!this.userMap.containsKey(userId)) return newsFeeds;

        Set<Integer> users =  this.userMap.get(userId).followers;

        PriorityQueue<Tweet> pq = new PriorityQueue<>(users.size(), (a, b) -> b.time - a.time);

        for(int user: users) {
            Tweet tweet = this.userMap.get(user).head
            if (tweet !== null) pq.add(tweet);
        }

        int counter = 0;

        while(pq.isEmpty() || counter < 10) {
            Tweet tweet = pq.poll();
            newsFeeds.add(tweet.id);
            counter++;
            if(tweet.next!= null) pq.add(tweet.next);
        }

        return newsFeeds;
    }

    

}