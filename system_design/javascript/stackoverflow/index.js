const StackOverflowService = require('./StackOverflowService');

function main() {

    let stackoverflowService = new StackOverflowService();
    let john =  stackoverflowService.addUser("1", "john", "john@gmail.com");
    let alice =  stackoverflowService.addUser("2", "alice", "alice@gmail.com");
    let bob =  stackoverflowService.addUser("3", "bob", "bob@gmail.com");

    let javaQuestion = stackoverflowService.askQuestion(1, alice, "What is polymorphism in Java?",
    "Can someone explain polymorphism in Java with an example?",
    ["java", "oop"]);

    // Bob answers Alice's question
    let bobAnswer = stackoverflowService.answerQuestion(1, john, javaQuestion,
        "Polymorphism in Java is the ability of an object to take on many forms...");

      // Charlie comments on the question
      stackoverflowService.addComment(1, bob, javaQuestion, "Great question! I'm also interested in learning about this.");

      // Alice comments on Bob's answer
      stackoverflowService.addComment(2, alice, bobAnswer, "Thanks for the explanation! Could you provide a code example?");

      stackoverflowService.voteQuestion(bob, javaQuestion, 4);
      stackoverflowService.voteQuestion(john, javaQuestion, 10);

      stackoverflowService.voteAnswer(bob, bobAnswer, 1);  

      stackoverflowService.acceptAnswer(bobAnswer);


          // Print out the current state
          console.log("Question: " + javaQuestion.getTitle());
          console.log("Asked by: " + javaQuestion.getAuthor().getUsername());
          console.log("Tags: " + javaQuestion.getTags());
          console.log("Votes: " + javaQuestion.getVoteCount());
          console.log("Comments: " + javaQuestion.getComments().map((comment) => comment.getContent()));
        //   console.log("\nAnswer by " + bobAnswer.getAuthor().getUsername() + ":");
        //   console.log(bobAnswer.getContent());
        //   console.log("Votes: " + bobAnswer.getVoteCount());
        //   console.log("Accepted: " + bobAnswer.isAccepted());
        //   console.log("Comments: " + bobAnswer.getComments().size());
  
        //   console.log("\nUser Reputations:");
        //   console.log("Alice: " + alice.getReputation());
        //   console.log("Bob: " + bob.getReputation());
        //   console.log("Charlie: " + charlie.getReputation());
  
}

main();