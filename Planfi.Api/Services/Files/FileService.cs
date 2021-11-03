using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using PlanfiApi.Data.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace PlanfiApi.Services.Files
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly string _bucketName = "planfi-movies";

        public FileService(DataContext context, IWebHostEnvironment environment)
        {
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        public async Task<List<byte[]>> ProcessFileExercise(List<IFormFile> files, string fileName)
        {
            var filesList = new List<byte[]>();

            if (files != null)
            {
                //todo - only one movie per exercise for now.
                foreach (var (formFile, iterator) in files.Select((c, i) => (c, i)))
                {
                    if (formFile.ContentType is "video/mp4" or "video/mov" or "video/avi" or "video/quicktime")
                    {
                        var ext = Path.GetExtension(formFile.FileName);
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        var fileNameWithExtensionAndNumber = fileName+1+ext;

                        var path = await SaveMovieToDirectory(formFile, fileNameWithExtensionAndNumber);
                        await SaveMovieToGoogleStorage(fileNameWithExtensionAndNumber, path);
                        filesList.Add(Encoding.ASCII.GetBytes(ext));
                    }
                    else
                    {
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        filesList.Add(memoryStream.ToArray());
                    }
                }
            }

            return filesList;
        }
        
        public async Task<string> SaveMovieToDirectory(IFormFile formFile, string name)
        {
            var path = Path.Combine(_environment.WebRootPath, "Movies");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileName = Path.GetFileName(name);
            await using var stream = new FileStream(Path.Combine(path, fileName), FileMode.Create);
            await formFile.CopyToAsync(stream);
            return Path.Combine(path, fileName);
        }

        public async Task SaveMovieToGoogleStorage(string fileName, string path)
        {
            var gcsStorage = await StorageClient.CreateAsync();
            Stream stream = new FileStream(path, FileMode.Open);
            var isExist = IsObjectExist(fileName);
            if (!isExist)
            {
                await gcsStorage.UploadObjectAsync(_bucketName, fileName, null, stream);
            }
        }

        public async Task DeleteMovieFromGoogleStorage(string fileName)
        {
            var storage = await StorageClient.CreateAsync();

            var isExist = IsObjectExist(fileName);
            if (isExist)
            {
                await storage.DeleteObjectAsync(_bucketName, fileName);
            }
        }

        public async Task DeleteFilesFromExercise(string exerciseName, List<byte[]> filesToDelete, List<byte[]> exerciseFiles)
        {
            for (var i = 0; i < filesToDelete.Count; i++)
            {
                var result = Encoding.UTF8.GetString(filesToDelete[i]);
                if (result.Length >= 10) continue;
                
                await DeleteMovieFromGoogleStorage(exerciseName + 1 + result);
            }
        }

        private bool IsObjectExist(string objectName)
        {
            try
            {
                var client = StorageClient.Create();
                client.GetObject(_bucketName, objectName);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }

    public interface IFileService
    {
        Task<List<byte[]>> ProcessFileExercise(List<IFormFile> files, string fileName);
        Task<string> SaveMovieToDirectory(IFormFile formFile, string name);
        Task SaveMovieToGoogleStorage(string fileName, string path);
        Task DeleteMovieFromGoogleStorage(string fileName);
        Task DeleteFilesFromExercise(string exerciseName, List<byte[]> filesToDelete, List<byte[]> exerciseFiles);
    }
}