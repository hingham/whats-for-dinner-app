Steps for implementing fine tuning, and integrating it into the APP

- Create fine tuning training with json file
    - Find recipes that are formatted as desired.
    - Copy and paste raw text from the page. Simplify language in the description.
    - Copy and paste the raw json data from the database. 
    - Do this for 10 recipes
- Upload data to chatGPT to get model


- Update "create form"
    - Use the parsing code I created
    - Also use chat gpt
    - Show data for both and allow users to select which one to save into the database when creating a new recipe


open AI fine tuning: https://platform.openai.com/docs/guides/supervised-fine-tuning
- Using the chat format for data - supervised uses chat so that is why
- Using supervised fine tuning - good for nuanced translation, generating content in a specific format, which is good for recipe mapping
- Choosing gpt-4.1-nano-2025-04-14 model - Lower computational costs: Fine-tuning a smaller model is significantly cheaper than training a large one from scratch or fine-tuning a giant model. Fine-tuning can be an effective way to use a smaller cheaper model


Structured Output could be key for this model to define the json schema
https://platform.openai.com/docs/guides/structured-outputs


```
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@training-data.jsonl"
  -F expires_after[anchor]="created_at"
  -F expires_after[seconds]=2592000
```

```
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create fine-tuning job

Using the mini model because documentations appear suggest that this would work with structured output json schema
```
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-KMh3CKAyzpoiyxDSZTKbDY",
    "model": "gpt-4.1-mini-2025-04-14",
    "method": {
        "type": "supervised"
    }
}'
```


## List the training jobs
```
curl https://api.openai.com/v1/fine_tuning/jobs?limit=2 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Poll training job:
```
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-vp6TFDhS8Rf9nKlAiN0jBBzW \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Integrating within App: responses API
https://platform.openai.com/docs/api-reference/responses

- Integrating with this API
- Using structured model outputs. AKA providing a JSON schema to specify the output of the model

Questions:
- Can I use a schema when training the model? Is this better?
- Is the Schema sufficient to get good results? Would I start to see an advantage of using the fine tuning to use a cheaper model?
- Can I rewrite the schema to be better? Seems like there is very strict scheme checking

Stuff seems like it is working:
- We are doing a two prompt method currently to get the best results
 - Refine recipe text to get concise directions
 - Pass refined text to structured output model with clear schema to get json that can be saved

Running into issues with personal model. Seems like the model training failed - but want to try it out tonight anyhow.

Structured model:
- Working well to parse recipe
- Seems unable to refine recipe at the same time. Providing the schema means the model focuses exclusively on formatting. Strength of the schema is everything here


Alternative Approach:
- Finetune a model that is really good at creating clear copy for a recipe
- Use structured output to pass refined recipe and get json output with clear json schema

## Recent model attempt (failed with eval errors)
ft:gpt-4.1-mini-2025-04-14:personal::CQHxydeN

Maybe I could try a more stable model? gpt-4o-mini-2024-07-18
Getting moderation issues
Server-side moderation issues - OpenAI's safety systems are having problems
Model instability - The nano model might be experimental
Training data flagged - Though recipe data shouldn't trigger this
Temporary service issues - Common with newer model variants
Issues with satefly checks: https://community.openai.com/t/fine-tuning-safety-evaluation-error/1362213 that explain why the model is marked as failed - in the openAI system