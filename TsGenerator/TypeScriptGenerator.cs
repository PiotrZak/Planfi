using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using PlanfiApi.Models.ViewModels;

namespace TsGenerator
{
    
    public static class TypeScriptGenerator
    {
        private const string _developerNote = "// NOTE: Type generated automatically. Please DON'T edit this file manually!";
        private static readonly Type[] _nonPrimitivesExcludeList = {
            typeof(object),
            typeof(string),
            typeof(decimal),
            typeof(void),
        };

        private static readonly Dictionary<Type, string> _convertedTypes = new()
        {
            [typeof(Guid)] = "Guid",
            [typeof(DateTime)] = "Date",
            [typeof(string)] = "string",
            [typeof(char)] = "string",
            [typeof(byte)] = "number",
            [typeof(sbyte)] = "number",
            [typeof(short)] = "number",
            [typeof(ushort)] = "number",
            [typeof(int)] = "number",
            [typeof(uint)] = "number",
            [typeof(long)] = "number",
            [typeof(ulong)] = "number",
            [typeof(float)] = "number",
            [typeof(double)] = "number",
            [typeof(decimal)] = "number",
            [typeof(bool)] = "boolean",
            [typeof(object)] = "any",
            [typeof(void)] = "void",
        };

        public static void RecursiveDeleteFiles(DirectoryInfo baseDir, string mask)
        {
            if (baseDir.Exists == false)
            {
                return;
            }

            foreach (var file in baseDir.EnumerateFiles(mask))
            {
                file.Delete();
            }

            foreach (var dir in baseDir.EnumerateDirectories())
            {
                RecursiveDeleteFiles(dir, mask);
            }

            if (baseDir.GetFileSystemInfos().Length == 0)
            {
                baseDir.Delete();
            }
        }

        public static void GenerateTypeScriptInterfaces(string path)
        {
            if (Directory.Exists(path))
            {
                RecursiveDeleteFiles(new DirectoryInfo(path), "*.tsx");
            }

            var typesToConvert = GetTypesToConvert();

            foreach (var type in typesToConvert)
            {
                var (name, lines) = ConvertCs2Ts(type);
                var fullPath = Path.Combine(path, name);
                var directory = Path.GetDirectoryName(fullPath);

                if (string.IsNullOrWhiteSpace(directory) == false && Directory.Exists(directory) == false)
                {
                    Directory.CreateDirectory(directory);
                }
                
                File.WriteAllLines(fullPath, lines);
            }

        }
        
        private static Type[] GetTypesToConvert()
        {
            var generateAttributeType = typeof(GenerateTypeScriptInterface);

            var assembly = Assembly.GetAssembly(generateAttributeType);

            if (assembly == null)
            {
                throw new Exception("Assembly not found");
            }
            
            var types = assembly?.GetTypes().Where(x => x.GetCustomAttribute(typeof(GenerateTypeScriptInterface)) != null);
            
            return types
                .Select(ReplaceByGenericArgument)
                .Where(x => x.IsPrimitive == false && _nonPrimitivesExcludeList.Contains(x) == false)
                .Distinct()
                .ToArray();
        }

        private static Type ReplaceByGenericArgument(Type type)
        {
            if (type.IsArray)
            {
                return type.GetElementType();
            }

            if (type.IsConstructedGenericType == false)
            {
                return type;
            }

            var genericArgument = type.GenericTypeArguments.First();

            return genericArgument.IsConstructedGenericType 
                ? ReplaceByGenericArgument(genericArgument) 
                : genericArgument;
        }

        private static (string Name, string[] Lines) ConvertCs2Ts(Type type)
        {
            if (type == null)
            {
                throw new Exception("Type not found");
            }
            
            const string fileExtension = ".tsx";
            
            var fileName = $"{type.Namespace.Replace(".", "/")}/{type.Name}{fileExtension}";

            var types = GetAllNestedTypes(type);
            var lines = new List<string>();

            foreach (var t in types)
            {
                lines.Add($"");

                if (t.IsClass || t.IsInterface)
                {
                    ConvertClassOrInterface(lines, t);
                }
                else if (t.IsEnum)
                {
                    ConvertEnum(lines, t);
                }
                else
                {
                    throw new InvalidOperationException();
                }
            }

            return (fileName, lines.ToArray());

        }

        private static void ConvertClassOrInterface(List<string> lines, Type type)
        {
            var imports = new HashSet<string>();
            var exports = new List<string>();
            
            exports.Add($"export type {type.Name} = {{");

            foreach (var property in type.GetProperties().Where(x => x.GetMethod.IsPublic))
            {
                var propType = property.PropertyType;
                var arrayType = GetArrayOrEnumerableType(propType);
                var nullableType = GetNullableType(propType);

                var typeToUse = nullableType ?? arrayType ?? propType;

                var isConvertedType = _convertedTypes.ContainsKey(typeToUse);
                var convertedType = ConvertType(isConvertedType, typeToUse);
                var convertedTypeSource = convertedType + ("");

                var suffix = "";
                suffix = arrayType != null 
                    ? "[]" 
                    : suffix;
                
                suffix = nullableType != null 
                    ? " | null" 
                    : suffix;

                imports.Add(_developerNote);

                if (isConvertedType == false && convertedType != type.Name)
                {
                    imports.Add($"import {{ {convertedType} }} from './{convertedTypeSource}';");
                }
                
                exports.Add($"\t{CamelCaseName(property.Name)}: {convertedType}{suffix}");
            }
            
            exports.Add($"}}");
            
            lines.AddRange(imports);
            lines.Add("");
            lines.AddRange(exports);
        }
        
        private static string ConvertType(bool isConvertedType, Type typeToUse)
        {
            if (isConvertedType)
            {
                return _convertedTypes[typeToUse];
            }

            if (typeToUse.IsConstructedGenericType && typeToUse.GetGenericTypeDefinition() == typeof(IDictionary<,>))
            {
                var keyType = typeToUse.GenericTypeArguments[0];
                var isKeyConvertedType = _convertedTypes.ContainsKey(keyType);
                var valueType = typeToUse.GenericTypeArguments[1];
                var isValueConvertedType = _convertedTypes.ContainsKey(valueType);

                return $"{{[key: {ConvertType(isKeyConvertedType, keyType)}]: {ConvertType(isValueConvertedType, valueType)}}}";
            }

            return typeToUse.Name;
        }

        private static void ConvertEnum(IList<string> lines, Type type)
        {
            var enumValues = type.GetEnumValues().Cast<int>().ToArray();
            var enumNames = type.GetEnumNames();

            lines.Add(_developerNote);
            lines.Add($"export const enum {type.Name} {{");

            for (int i = 0; i < enumValues.Length; i++)
            {
                lines.Add($"\t{enumNames[i]} = {enumValues[i]},");
            }

            lines.Add($"}}");
        }

        private static Type[] GetAllNestedTypes(Type type)
        {
            return new[] {type}
                .Concat(type.GetNestedTypes()
                .SelectMany(GetAllNestedTypes))
                .ToArray();
        }

        private static Type GetArrayOrEnumerableType(Type type)
        {
            if (type.IsArray)
            {
                return type.GetElementType();
            }

            if (type.IsConstructedGenericType)
            {
                var typeArgument = type.GenericTypeArguments.First();

                if (typeof(IEnumerable<>).MakeGenericType(typeArgument).IsAssignableFrom(type))
                {
                    return typeArgument;
                }
            }
            return null;
        }

        private static Type GetNullableType(Type type)
        {
            if (type.IsConstructedGenericType)
            {
                var typeArgument = type.GenericTypeArguments.First();
                
                if(typeArgument.IsValueType && typeof(Nullable<>).MakeGenericType(typeArgument).IsAssignableFrom(type))
                {
                    return typeArgument;
                }
            }

            return null;
        }

        private static string CamelCaseName(string pascalCaseName)
        {
            return pascalCaseName[0].ToString().ToLower() + pascalCaseName.Substring(1);
        }
    }
}
