using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;


namespace Core.Services;

public class ImageService(IConfiguration configuration):IImageService
{
    public async Task<string> UploadImageAsync(IFormFile file)
    {
        try
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileName = Path.GetRandomFileName() + ".webp";
            var bytes = memoryStream.ToArray();
            using var image = Image.Load(bytes);
            image.Mutate(imgc =>
            {
                imgc.Resize(new ResizeOptions
                {
                    Size = new Size(600, 600),
                    Mode = ResizeMode.Max
                });
            });
            var dirImageName = configuration["DirImageName"] ?? "images";
            var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName, fileName);
            await image.SaveAsync(path, new WebpEncoder());
            return fileName;
        }
        catch
        {
            return String.Empty;
        }
    }
    public async Task<string> UploadImageFromUrlAsync(string imageUrl)
    {
        try
        {
            using var httpClient = new HttpClient();
            var bytes = await httpClient.GetByteArrayAsync(imageUrl);

            using var image = Image.Load(bytes);

            image.Mutate(imgc =>
            {
                imgc.Resize(new ResizeOptions
                {
                    Size = new Size(600, 600),
                    Mode = ResizeMode.Max
                });
            });

            var fileName = Path.GetRandomFileName() + ".webp";

            var dirImageName = configuration["DirImageName"] ?? "images";
            var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(path)!);

            await image.SaveAsync(path, new WebpEncoder());

            return fileName;
        }
        catch
        {
            return string.Empty;
        }
    }
    public async Task<bool> DeleteImageAsync(string fileName)
    {
        try
        {
            var dirImageName = configuration["DirImagePath"];
            var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName, fileName);

            if (File.Exists(path))
            {
                await Task.Run(() => File.Delete(path));
                return true;
            }

            return false;
        }
        catch
        {
            return false;
        }
    }

    public async Task<string> UpdateImageAsync(IFormFile newFile, string? oldFileName)
    {
        
        if (newFile == null || newFile.Length == 0)
            return oldFileName ?? string.Empty;

       
        string newFileName = await UploadImageAsync(newFile);

       
        if (string.IsNullOrEmpty(newFileName))
            return oldFileName ?? string.Empty;

        
        if (!string.IsNullOrEmpty(oldFileName))
            await DeleteImageAsync(oldFileName);

        return newFileName;
    }
}