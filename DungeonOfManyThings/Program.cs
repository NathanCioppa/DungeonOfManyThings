
// See https://aka.ms/new-console-template for more information

Console.WriteLine("Hello, World!");



    var client = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Get, "https://www.dnd5eapi.co/api/2014/monsters/aboleth");
    request.Headers.Add("Accept", "application/json");
    var response = await client.SendAsync(request);
    response.EnsureSuccessStatusCode();
    Console.WriteLine(await response.Content.ReadAsStringAsync());

