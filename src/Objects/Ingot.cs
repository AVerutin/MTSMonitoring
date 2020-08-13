namespace MTSMonitoring
{
    public class Ingot
    {
        private Materials Layers;

        public Ingot()
        {
            Layers = new Materials();


        }

        public void Test()
        {
            Material mat1 = new Material();
            Material mat2 = new Material(2, "FeSiMn", 25, 3.5);
            mat1.setMaterial(1, "FeSiMn", 17, 1.5);

            int cnt = Layers.Count;
            Layers.addMaterial(mat1);
            Layers.addMaterial(mat2);

            for (int i=0; i<Layers.Count; i++)
            {
                Material mat = Layers.getMaterial(i);
            }

            Materials mats = Layers.removeMaterial();
            Layers.empty();
        }
    }
}
