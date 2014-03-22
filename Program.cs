using Nancy;
using Nancy.Conventions;
using Nancy.Hosting.Self;
using Nancy.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace comcamp_demo_live
{
    class Program
    {
        static void Main(string[] args)
        {
            var uri = new Uri("http://localhost:8080");

            HostConfiguration conf = new HostConfiguration();
            conf.UrlReservations.CreateAutomatically = true;

            using (var app = new NancyHost(conf, uri))
            {
                app.Start();

                Console.WriteLine("Nancy App is running {0}", uri);
                Console.Read();
            }
        }
    }

    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = parameters =>
            {
                return View["index"];
            };
        }
    }

    public class PostModule : NancyModule
    {
        public PostModule()
        {
            Get["/posts"] = parameters =>
            {
                return Response.AsJson(FakeData.GetPosts());
            };

            Put["/posts/{id}"] = parameters =>
            {
                Post postReceived = this.Bind<Post>();
                var post = FakeData.GetPosts().First(p => p.Id == parameters.id);
                post.Title = postReceived.Title;
                post.Contents = postReceived.Contents;

                return Response.AsJson(new { post = post }, HttpStatusCode.OK);
            };
        }
    }

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Contents { get; set; }
    }

    public class FakeData
    {
        public static IList<Post> posts = new List<Post>();

        public static IList<Post> GetPosts()
        {
            if (posts.Count == 0)
            {
                posts.Add(new Post { Id = 1, Title = "I like Nancy", Contents = "Nancy is Cooooool" });
                posts.Add(new Post { Id = 2, Title = "I like Ember.js", Contents = "Ember.js is so Cooooool" });
            }

            return posts;
        }
    }

    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            // view files location
            nancyConventions.ViewLocationConventions.Add(
                (viewName, model, context) =>
                    string.Concat("webapp/", viewName)
            );

            // allow files only define here
            nancyConventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("/", "webapp", new string[] { "js", "css", "jpg", "jpeg" }));
        }
    }
}


















