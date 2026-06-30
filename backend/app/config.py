from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "llama3"
    supabase_url: str = ""
    supabase_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
