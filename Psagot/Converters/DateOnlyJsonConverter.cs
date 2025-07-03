using System;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace Psagot.Converters
{
    public class DateOnlyJsonConverter : JsonConverter<DateOnly>

    //JsonConverter<DateOnly>
    {
        private const string Format = "yyyy-MM-dd";

        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                using (var doc = JsonDocument.ParseValue(ref reader))
                {
                    var root = doc.RootElement;
                    var day = root.GetProperty("day").GetInt32();
                    var month = root.GetProperty("month").GetInt32();
                    var year = root.GetProperty("year").GetInt32();
                    return new DateOnly(year, month, day);
                }
            }
            else if (reader.TokenType == JsonTokenType.String)
            {
                var value = reader.GetString();
                return DateOnly.ParseExact(value!, Format);
            }
            throw new JsonException("Unexpected token when parsing DateOnly");
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(Format));
        }
    }
}

