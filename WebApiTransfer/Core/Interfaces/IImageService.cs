using Microsoft.AspNetCore.Http;

namespace Core.Interfaces;

public interface IImageService
{
    public Task<string> UploadImageAsync(IFormFile file);

    Task<bool> DeleteImageAsync(string fileName);
    
    public Task<string> UpdateImageAsync(IFormFile file, string? oldFileName);
    

}