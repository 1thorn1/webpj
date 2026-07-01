from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_key: str = ""
    deepseek_api_key: str = ""
    deepseek_base_url: str = "https://openrouter.ai/api/v1"
    deepseek_model: str = "deepseek/deepseek-v4-flash"
    tavily_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
