
import json

class Quiz():
    
    def __init__(self):
        self.quiz_answers = [0] * 10
        self.index = 0
        self.questions = [
        "You’ve just been assigned a project on a topic you’ve never studied before. What’s your first move?",
        "When someone explains a complex topic to you, how do you typically respond?",
        "You’re stuck on a difficult problem. What’s your next step?",
        "Think back to the last time you studied for a major exam. What strategy worked best for you?",
        "When you make a mistake or encounter failure while learning, how do you respond?",
        "When you need to remember information from a class or project, what’s your go-to strategy?",
        "You’re working on a group project with classmates. How do you contribute most effectively?",
        "A month after learning something, what helps you recall the information best?",
        "When faced with a real-world problem related to your studies, how do you solve it?",
        "What keeps you motivated to keep learning and improving?"
        ]
        self.current_question = self.questions[0]
        self.letter_to_number = {"a": 1, "b": 2, "c": 3, "d": 4}
        self.active = True #if all questions get answered, active == False, disabling the quiz
        self.submit = False #will be used by framework. when submit == True, answering question will submit the quiz (will be done with outer function that calls self.answer_question, not by self.answer_question directly)

    def next_question(self):
        self.index += 1
        if not self.index < len(self.quiz_answers):
            self.index = 0
        self.save()
        return "moved on to next question"

    def answer_question(self, letter_input):
        if letter_input not in "abcd":
            return "invalid input"
        number_output = self.letter_to_number[letter_input]
        self.quiz_answers[self.index] = number_output
        self.save()
        return f"question {self.index + 1} answered: {letter_input}"

    def save(self):
        #uses self.index to update the rest of the variables accordingly
        self.current_question = self.questions[self.index]
        if 0 not in self.quiz_answers:
            self.active = False
        elif self.quiz_answers.count(0) == 1 and self.quiz_answers[self.index] == 0:
            self.submit = True
        else:
            self.submit = False
        return "status updated/saved"
    
    def skip_to_question(self, question_number):
        if not 1 <= question_number <= 10:
            return "invalid question number"
        self.index = question_number - 1
        self.save()
        return f"skipped to question {question_number}"
    
    def __str__(self):
        return json.dumps(self.quiz_answers)


quiz = Quiz()
#answering questions
quiz.answer_question("a")
quiz.answer_question("c")
#skipping question 2
quiz.next_question()
quiz.next_question()
quiz.answer_question("a")
quiz.next_question()
quiz.answer_question("d")
quiz.next_question()
quiz.answer_question("c")
quiz.next_question()
quiz.answer_question("b")
#skipping question 7
quiz.next_question()
quiz.next_question()
quiz.answer_question("a")
quiz.next_question()
quiz.answer_question("a")
quiz.next_question()
quiz.answer_question("a")
print(quiz)
quiz.skip_to_question(2)
quiz.answer_question("c")
#showing quiz questions state after skipping to question 2 and answering it
print(quiz)
print(quiz.active)
print(quiz.submit)
quiz.skip_to_question(7)
#showing quiz questions state after skipping to question 7 before answering it
print(quiz)
print(quiz.active)
print(quiz.submit)
quiz.answer_question("d")
#showing quiz questions state after skipping to question 7 before answering it
print(quiz)
print(quiz.active)
print(quiz.submit)

