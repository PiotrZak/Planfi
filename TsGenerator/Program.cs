// See https://aka.ms/new-console-template for more information

using System;
using System.IO;

namespace TsGenerator
{
  public class Program
  {
    public static void Main(string[] args)
    {
      const string appRelativePath = "../../../../Planfi.Front/src/Types";
      var outputPath = args.Length > 0 ? args[0] : AppContext.BaseDirectory + appRelativePath;
      var fullOutputPath = Path.GetFullPath(outputPath);

      TypeScriptGenerator.GenerateTypeScriptInterfaces(fullOutputPath);
      Console.WriteLine("Typescript interfaces generated to:" + fullOutputPath);

      Environment.Exit(1);
    }
  }
}
