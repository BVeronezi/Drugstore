using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Drugstore.Web.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content").Include(
                      "~/Content/*.css"));

            bundles.Add(new ScriptBundle("~/Scripts").Include(
                    "~/Scripts/*.js"));


            BundleTable.EnableOptimizations = false;
        }
    }
}
