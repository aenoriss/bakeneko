import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  // Run first prompt
  const basePromptPrefix = `
This is a chat with the person named below. It should be able to answer my questions only using the information provided in context.

Name: ${req.body.userName}
`;

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}${req.body.question}/n`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const finalCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `API: "Translate the chat into english and answer in the following format: ${[
      req.body.userName,
    ]}: ${
      baseCompletion.data.choices.pop().text
    }. Don't indicate that is a translation or an answer, start with the name.`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = finalCompletion.data.choices.pop();

  console.log(basePromptOutput);

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
